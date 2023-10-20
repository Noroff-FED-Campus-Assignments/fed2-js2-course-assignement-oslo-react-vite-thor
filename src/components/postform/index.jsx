import PropTypes from "prop-types";

export default function StyledPostForm({
  title,
  body,
  tags,
  setTitle,
  setBody,
  setTags,
  handleSubmit,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="glass editor mx-auto w-10/12 flex flex-col text-gray-800 p-4 shadow-lg max-w-2xl bg-base-100 rounded-2xl"
    >
      <input
        className="title bg-transparent border-b border-secondary  p-2 mb-4 outline-none rounded"
        spellCheck="false"
        placeholder="Title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="description bg-transparent p-3 h-60outline-none rounded"
        spellCheck="false"
        placeholder="Share something here..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <div>
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <div className="buttons flex">
        <div className="btn border bg-base-100 border-base-100 p-1 px-4 font-semibold cursor-pointer ml-auto rounded-2xl hover:rounded-none transition-all ease-in-out duration-300">
          Cancel
        </div>
        <button
          type="submit"
          className="btn border border-secondary p-1 px-4 font-semibold cursor-pointer ml-2 bg-secondary rounded-2xl hover:rounded transition-all ease-in-out duration-300"
        >
          Post
        </button>
      </div>
    </form>
  );
}

StyledPostForm.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  setBody: PropTypes.func.isRequired,
  setTags: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
