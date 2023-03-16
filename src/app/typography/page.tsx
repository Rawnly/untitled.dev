export default function Page() {
  return (
    <div className="space-y-4">
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
      <p>
        This is a paragraph with <strong>bold</strong> and <em>italic</em> text.
      </p>
      <ul>
        <li>Unordered list item 1</li>
        <li>Unordered list item 2</li>
        <li>Unordered list item 3</li>
      </ul>
      <ol>
        <li>Ordered list item 1</li>
        <li>Ordered list item 2</li>
        <li>Ordered list item 3</li>
      </ol>
      <blockquote className="rx-bg-neutral-2 p-4 rounded-lg border-l-4 rx-border-neutral-6 rounded-none italic relative">
        <p className="rx-text-neutral-11 mb-2">my quote</p>
        <footer className="rx-text-neutral-9 text-right absolute bottom-2 right-2">
          — Federico
        </footer>
      </blockquote>
      <pre className="rx-bg-neutral-2 py-3 px-4 rounded-lg overflow-x-auto">
        <code>This is multi line code</code>
      </pre>
      <code>This is inline code.</code> <br />
      <a href="https://www.example.com">This is a link</a>
    </div>
  );
}
