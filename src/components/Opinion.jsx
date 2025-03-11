import { use, useOptimistic } from "react";
import { OpinionsContext } from "../context/opinions-context";
import VoteButton from "./VoteButton";

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
   const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);
   const [optimisticVote, setOptimisticVote] = useOptimistic(
      votes,
      (prevVote, mode) => (mode === "up" ? prevVote + 1 : prevVote - 1)
   );
   const upVoteAction = async () => {
      setOptimisticVote("up");
      await upvoteOpinion(id);
      console.log("upVoteAction");
   };
   const downVoteAction = async () => {
      setOptimisticVote("down");
      await downvoteOpinion(id);
      console.log("downVoteAction");
   };
   return (
      <article>
         <header>
            <h3>{title}</h3>
            <p>Shared by {userName}</p>
         </header>
         <p>{body}</p>
         <form className="votes">
            <VoteButton formAction={upVoteAction}>
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
               >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="m16 12-4-4-4 4" />
                  <path d="M12 16V8" />
               </svg>
            </VoteButton>

            <span>{optimisticVote}</span>

            <VoteButton formAction={downVoteAction}>
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
               >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M12 8v8" />
                  <path d="m8 12 4 4 4-4" />
               </svg>
            </VoteButton>
         </form>
      </article>
   );
}
