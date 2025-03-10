import { useActionState, use } from "react";
import { OpinionsContext } from "../context/opinions-context";

export function NewOpinion() {
   const { addOpinion } = use(OpinionsContext);
   const shareOpinionAction = async (prev, formData) => {
      const userName = formData.get("userName");
      const title = formData.get("title");
      const body = formData.get("body");
      const data = { userName, title, body };

      let error = [];
      if (userName.trim().length < 3) {
         error.push("Name must be at least 3 characters long.");
      }
      if (title.trim().length < 3) {
         error.push("Title must be at least 3 characters long.");
      }
      if (body.trim().length < 10) {
         error.push("Opinion must be at least 10 characters long.");
      }
      if (error.length > 0) {
         return { error, enteredValue: data };
      }
      console.log(data);
      await addOpinion(data);
      return { error: [] };
   };
   const [formState, formAction] = useActionState(shareOpinionAction, {
      error: [],
      enteredValue: {},
   });

   return (
      <div id="new-opinion">
         <h2>Share your opinion!</h2>
         <form action={formAction}>
            <div className="control-row">
               <p className="control">
                  <label htmlFor="userName">Your Name</label>
                  <input
                     type="text"
                     id="userName"
                     name="userName"
                     defaultValue={formState.enteredValue?.userName}
                  />
               </p>
               <p className="control">
                  <label htmlFor="title">Title</label>
                  <input
                     type="text"
                     id="title"
                     name="title"
                     defaultValue={formState.enteredValue?.title}
                  />
               </p>
            </div>
            <p className="control">
               <label htmlFor="body">Your Opinion</label>
               <textarea
                  id="body"
                  name="body"
                  rows={5}
                  defaultValue={formState.enteredValue?.body}
               ></textarea>
            </p>
            // TODO: Show the error underneath the field not in separate list
            {formState.error.length > 0 && (
               <ul className="errors">
                  <p>Errors:</p>
                  {formState.error.map((e, i) => (
                     <li key={i}>{e}</li>
                  ))}
               </ul>
            )}
            <p className="actions">
               <button type="submit">Submit</button>
            </p>
         </form>
      </div>
   );
}
