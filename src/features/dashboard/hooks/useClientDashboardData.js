import { useCallback, useEffect, useMemo, useState } from "react";
import { STORAGE_KEYS } from "../../../config/constants";
import { getCurrentUserEmail } from "../../../services/authService";
import {
  fetchApprovals,
  fetchClientMessages,
  fetchInvoices,
  fetchProject,
  fetchProjectFiles,
  sendClientMessage,
  subscribeToApprovals,
  subscribeToClientMessages,
  subscribeToProject,
  updateApprovalStatus,
  uploadProjectFile,
} from "../../../services/dashboardService";
import { toAppError } from "../../../services/errors";
import { validateUpload } from "../../../utils/fileValidation";
import { readStorage, writeStorage } from "../../../utils/storage";

const ALLOWED_APPROVAL_STATUSES = ["approved", "rejected", "pending"];

/**
 * Data + actions for the client portal.
 * @param {(message: string, type?: "info"|"success"|"error") => void} notify toast callback
 */
export default function useClientDashboardData(notify) {
  const [project, setProject] = useState(null);
  const [projectFiles, setProjectFiles] = useState([]);
  const [clientMessages, setClientMessages] = useState([]);
  const [approvals, setApprovals] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [lastRead, setLastRead] = useState(() =>
    parseInt(readStorage(STORAGE_KEYS.lastMessageRead) || "0", 10)
  );

  /* Derived (cached) instead of stored: number of admin messages newer than the last read. */
  const unreadCount = useMemo(
    () =>
      clientMessages.filter((m) => m.is_admin && new Date(m.created_at).getTime() > lastRead)
        .length,
    [clientMessages, lastRead]
  );

  const markMessagesRead = useCallback(() => {
    const now = Date.now();
    writeStorage(STORAGE_KEYS.lastMessageRead, now);
    setLastRead(now);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const ifMounted = (setter) => (value) => {
      if (!cancelled) setter(value);
    };

    getCurrentUserEmail().then(ifMounted(setUserEmail)).catch(() => {});

    // Load everything in parallel; report one friendly error instead of five.
    Promise.allSettled([
      fetchProject().then(ifMounted(setProject)),
      fetchProjectFiles().then(ifMounted(setProjectFiles)),
      fetchClientMessages().then(ifMounted(setClientMessages)),
      fetchApprovals().then(ifMounted(setApprovals)),
      fetchInvoices().then(ifMounted(setInvoices)),
    ]).then((results) => {
      if (!cancelled && results.some((r) => r.status === "rejected")) {
        notify("Some of your portal data couldn't be loaded. Please refresh.", "error");
      }
    });

    const stopProject = subscribeToProject(() =>
      fetchProject().then(ifMounted(setProject)).catch(() => {})
    );
    const stopApprovals = subscribeToApprovals(() =>
      fetchApprovals().then(ifMounted(setApprovals)).catch(() => {})
    );
    const stopMessages = subscribeToClientMessages((row) => {
      if (cancelled) return;
      setClientMessages((current) => (current.some((m) => m.id === row.id) ? current : [...current, row]));
      if (row.is_admin) notify("New message from Pixel & Brush", "info");
    });

    return () => {
      cancelled = true;
      stopProject();
      stopApprovals();
      stopMessages();
    };
  }, [notify]);

  /** @returns {Promise<boolean>} true when sent */
  const sendMessage = useCallback(
    async (text) => {
      const clean = text.trim().slice(0, 2000);
      if (!clean) return false;
      try {
        await sendClientMessage(clean);
        return true;
      } catch (err) {
        notify(toAppError(err).message, "error");
        return false;
      }
    },
    [notify]
  );

  const handleApproval = useCallback(
    async (id, status) => {
      if (!ALLOWED_APPROVAL_STATUSES.includes(status)) return;
      try {
        await updateApprovalStatus(id, status);
        setApprovals((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
        notify(
          status === "approved" ? "Item approved! ✅" : "Change request sent.",
          status === "approved" ? "success" : "info"
        );
      } catch (err) {
        notify(toAppError(err).message, "error");
      }
    },
    [notify]
  );

  const uploadFile = useCallback(
    async (file) => {
      const checked = validateUpload(file);
      if (!checked.ok) {
        notify(checked.error, "error");
        return;
      }

      setIsUploading(true);
      try {
        await uploadProjectFile(file, checked);
        setProjectFiles(await fetchProjectFiles());
        notify("File uploaded successfully! ✅", "success");
      } catch (err) {
        notify(toAppError(err, "An error occurred during upload. Please try again.").message, "error");
      } finally {
        setIsUploading(false);
      }
    },
    [notify]
  );

  return {
    project,
    projectFiles,
    clientMessages,
    approvals,
    invoices,
    userEmail,
    unreadCount,
    isUploading,
    markMessagesRead,
    sendMessage,
    handleApproval,
    uploadFile,
  };
}
