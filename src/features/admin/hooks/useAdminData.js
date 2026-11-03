import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetchChatMessages,
  fetchInquiries,
  fetchProject,
  sendAdminReply,
  subscribeToChat,
  subscribeToInquiries,
  updateProject,
} from "../../../services/adminService";
import { toAppError } from "../../../services/errors";

const appendUnique = (list, rows) => {
  const seen = new Set(list.map((row) => row.id));
  return [...list, ...rows.filter((row) => !seen.has(row.id))];
};

/**
 * All data + actions for the admin dashboard.
 * - initial data loads in parallel
 * - realtime inserts are merged in place (no refetch of whole tables)
 * - inquiries are paginated ("Load more")
 */
export default function useAdminData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [inquiries, setInquiries] = useState([]);
  const [inquiryTotal, setInquiryTotal] = useState(0);
  const [inquiryPage, setInquiryPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const [clientMessages, setClientMessages] = useState([]);

  const [progress, setProgress] = useState(75);
  const [stage, setStage] = useState("Development");
  const [health, setHealth] = useState("On Track");
  const [launchDate, setLaunchDate] = useState("2026-07-28");
  const [saveStatus, setSaveStatus] = useState("");
  const saveTimer = useRef(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const [inquiryPageData, chat, project] = await Promise.all([
          fetchInquiries(),
          fetchChatMessages(),
          fetchProject(),
        ]);
        if (cancelled) return;
        setInquiries(inquiryPageData.rows);
        setInquiryTotal(inquiryPageData.total);
        setClientMessages(chat);
        if (project) {
          if (project.progress !== undefined) setProgress(project.progress);
          if (project.stage) setStage(project.stage);
          if (project.health) setHealth(project.health);
          if (project.launch_date) setLaunchDate(project.launch_date);
        }
      } catch (err) {
        if (!cancelled) setError(toAppError(err).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    const stopInquiries = subscribeToInquiries((row) => {
      setInquiries((current) => (current.some((r) => r.id === row.id) ? current : [row, ...current]));
      setInquiryTotal((total) => total + 1);
    });
    const stopChat = subscribeToChat((row) =>
      setClientMessages((current) => (current.some((m) => m.id === row.id) ? current : [...current, row]))
    );

    return () => {
      cancelled = true;
      clearTimeout(saveTimer.current);
      stopInquiries();
      stopChat();
    };
  }, []);

  const loadMoreInquiries = useCallback(async () => {
    setLoadingMore(true);
    try {
      const nextPage = inquiryPage + 1;
      const { rows, total } = await fetchInquiries({ page: nextPage });
      setInquiries((current) => appendUnique(current, rows));
      setInquiryTotal(total);
      setInquiryPage(nextPage);
    } catch (err) {
      setError(toAppError(err).message);
    } finally {
      setLoadingMore(false);
    }
  }, [inquiryPage]);

  /** @returns {Promise<boolean>} true when the reply was stored */
  const sendReply = useCallback(async (text) => {
    const message = text.trim().slice(0, 2000);
    if (!message) return false;
    try {
      const row = await sendAdminReply(message);
      setClientMessages((current) => (current.some((m) => m.id === row.id) ? current : [...current, row]));
      return true;
    } catch (err) {
      setError(toAppError(err).message);
      return false;
    }
  }, []);

  const saveProject = useCallback(async () => {
    setSaveStatus("Saving...");
    try {
      await updateProject({ progress, stage, health, launchDate });
      setSaveStatus("✅ Project updated successfully!");
      clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => setSaveStatus(""), 4000);
    } catch (err) {
      setSaveStatus("");
      setError(toAppError(err).message);
    }
  }, [progress, stage, health, launchDate]);

  return {
    loading,
    error,
    clearError: () => setError(""),
    inquiries,
    inquiryTotal,
    hasMoreInquiries: inquiries.length < inquiryTotal,
    loadingMore,
    loadMoreInquiries,
    clientMessages,
    sendReply,
    progress,
    setProgress,
    stage,
    setStage,
    health,
    setHealth,
    launchDate,
    setLaunchDate,
    saveStatus,
    saveProject,
  };
}
