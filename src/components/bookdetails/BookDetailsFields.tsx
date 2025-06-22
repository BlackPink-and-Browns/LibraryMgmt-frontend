import AuthorGenreSelect from "../AuthorGenreSelect";

const BookDetailsFields = ({
  book,
  isEditing,
  handleChange,
  selectedAuthors,
  selectedGenres,
  setSelectedAuthors,
  setSelectedGenres,
}: {
  book: any;
  isEditing: any;
  handleChange: any;
  selectedAuthors: any;
  selectedGenres: any;setSelectedAuthors: any;setSelectedGenres: any;
}) => {
  return (
    <>
      {isEditing ? (
        <input
          name="title"
          value={book.title}
          onChange={handleChange}
          className="inputfield text-lg font-semibold"
        />
      ) : (
        <h2 className="text-xl font-semibold">{book.title}</h2>
      )}

      {isEditing ? (
        <AuthorGenreSelect
          selectedAuthors={selectedAuthors}
          selectedGenres={selectedGenres}
          onAuthorsChange={setSelectedAuthors}
          onGenresChange={setSelectedGenres}
        />
      ) : (
        <>
          <div>
            <strong>Authors:</strong>{" "}
            {book?.authors.map((a:any) => a.name).join(", ")}
          </div>
          <div className="mt-4">
            <strong>Genres:</strong> {book.genres.map((g:any) => g.name).join(", ")}
          </div>
        </>
      )}

      <div>
        <strong>Copies:</strong> {book.copies.length}
      </div>

      <div>
        <strong>Description:</strong>
        {isEditing ? (
          <textarea
            name="description"
            value={book.description}
            onChange={handleChange}
            className="inputfield mt-1 w-full"
            rows={4}
          />
        ) : (
          <p className="text-gray-600 text-sm mt-1">{book.description}</p>
        )}
      </div>
    </>
  );
};
export default BookDetailsFields;
