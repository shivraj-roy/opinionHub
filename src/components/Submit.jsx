import { useFormStatus } from "react-dom";

export default function Submit() {
   const { pending } = useFormStatus();
   return (
      <p className="actions">
         <button disabled={pending} type="submit">
            {pending ? "Posting..." : "Post"}
         </button>
      </p>
   );
}
