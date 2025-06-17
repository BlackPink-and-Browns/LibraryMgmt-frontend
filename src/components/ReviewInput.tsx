import { useState } from "react";

interface ReviewProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

export default function ReviewInput({
  value,
  onChange,
  readOnly = false,
}: ReviewProps) {
  return (
    <>
      <div>
        <textarea
          placeholder="Write your review..."
          value={value}
          readOnly={readOnly}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="w-full rounded-md border border-slate-400 bg-slate-50 px-3 py-2 text-sm "
          rows={3}
        />
      </div>
    </>
  );
}
