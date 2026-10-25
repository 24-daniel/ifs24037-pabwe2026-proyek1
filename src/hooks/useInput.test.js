import { describe, expect, it } from "vitest";
import { useInput } from "./useInput.js";

describe("useInput", () => {
  it("mengisi ulang nilai dan mengembalikan default saat reset kosong", () => {
    const { values, reset } = useInput({ title: "", location: "" });
    reset({ title: "Doa pagi" });
    expect(values).toEqual({ title: "Doa pagi", location: "" });
    reset();
    expect(values).toEqual({ title: "", location: "" });
  });
});
