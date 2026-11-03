import { isValidEmail, validateInquiry } from "./utils/validators";
import { buildStages } from "./features/dashboard/stages";
import { AppError, toAppError, unwrap } from "./services/errors";

describe("Pixel & Brush core utilities", () => {
  test("validates email addresses accurately", () => {
    expect(isValidEmail("client@pixelandbrush.co.uk")).toBe(true);
    expect(isValidEmail("invalid-email")).toBe(false);
  });

  test("validates and sanitizes contact form fields", () => {
    const missingField = validateInquiry({
      name: "Anil",
      email: "anil@example.com",
      message: "   ",
    });
    expect(missingField.valid).toBe(false);

    const validSubmission = validateInquiry({
      name: "  Anil Panth  ",
      email: "anil@example.com",
      service: "Web Development",
      message: "Looking for a brand redesign.",
    });
    expect(validSubmission.valid).toBe(true);
    expect(validSubmission.values.name).toBe("Anil Panth");
  });

  test("computes dynamic project stages from current stage", () => {
    const stages = buildStages("Design");
    expect(stages[0].status).toBe("done");
    expect(stages[1].status).toBe("active");
    expect(stages[2].status).toBe("pending");
  });

  test("normalizes errors into AppError instances with user-safe fallback", () => {
    const raw = new Error("Internal PostgREST error");
    const err = toAppError(raw, "Could not load inquiries.");
    expect(err).toBeInstanceOf(AppError);
    expect(err.message).toBe("Could not load inquiries.");
    expect(err.cause).toBe(raw);
    expect(unwrap({ data: [1, 2], error: null }, "Fallback")).toEqual([1, 2]);
  });
});
