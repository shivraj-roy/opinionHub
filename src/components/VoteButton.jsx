import { useFormStatus } from "react-dom";

const VoteButton = ({ children, ...props }) => {
   const { pending } = useFormStatus();
   return (
      <button disabled={pending} {...props}>
         {children}
      </button>
   );
};
export default VoteButton;
