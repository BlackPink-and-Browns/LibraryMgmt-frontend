const BookMeta = ({ book }:{book:any}) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 pt-4">
    <div className="flex items-center gap-2">
      <span className="font-bold">📖 ISBN:</span>
      <span>{book.isbn}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="font-bold">BookId:</span>
      <span>{book.id}</span>
    </div>
  </div>
);

export default BookMeta