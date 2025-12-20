export default function View({ taskParams }) {
  const name = taskParams.name;
  const description = taskParams.description;
  return (
    <div className="font-sans subpixel-antialiased text-neutral-400 text-sm">
      <h3 className="underline text-neutral-900 antialiased">
        <b>
        {name}
        </b>
      </h3>
      {description && <p className="whitespace-pre-line text-sm">Description: {description}</p>}
    </div>
  );
}
