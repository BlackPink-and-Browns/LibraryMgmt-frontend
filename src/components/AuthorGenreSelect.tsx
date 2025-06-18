import React, { useMemo, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { useCreateGenreMutation, useGetAllGenreQuery } from "../api-service/genre/genre.api";
import { useCreateAuthorMutation, useGetAllAuthorsQuery } from "../api-service/author/author.api";
import GenreDescriptionModal from "./GenreDescriptionModal"; // Import modal

type OptionType = {
  name?: string;
  label: string;
  value: number | string;
  description?: string;
};

type AuthorGenreSelectProps = {
  selectedAuthors: OptionType[];
  selectedGenres: OptionType[];
  onAuthorsChange: (value: OptionType[]) => void;
  onGenresChange: (value: OptionType[]) => void;
};

const AuthorGenreSelect: React.FC<AuthorGenreSelectProps> = ({
  selectedAuthors,
  selectedGenres,
  onAuthorsChange,
  onGenresChange,
}) => {
  const { data: genres, isLoading: genreLoading } = useGetAllGenreQuery({});
  const { data: authors, isLoading: authorLoading } = useGetAllAuthorsQuery({});

  const [createGenre] = useCreateGenreMutation();
  const [createAuthor] = useCreateAuthorMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingGenreName, setPendingGenreName] = useState("");

  const genreOptions: OptionType[] = useMemo(() => {
    return (
      genres?.map((genre) => ({
        label: genre.name,
        value: genre.id,
        description: genre.description,
      })) || []
    );
  }, [genres]);

  const authorOptions: OptionType[] = useMemo(() => {
    return (
      authors?.map((author) => ({
        label: author.name,
        value: author.id,
      })) || []
    );
  }, [authors]);

  const handleCreateGenre = (inputValue: string) => {
    setPendingGenreName(inputValue);
    setIsModalOpen(true);
  };

  const handleGenreSubmit = async (description: string) => {
    try {
      const newGenre = await createGenre({ name: pendingGenreName, description }).unwrap();
      const newOption: OptionType = {
        label: newGenre.name,
        value: newGenre.id,
        description: newGenre.description,
      };
      onGenresChange([...selectedGenres, newOption]);
    } catch (err) {
      console.error("Genre creation failed", err);
      alert("Error creating genre.");
    } finally {
      setIsModalOpen(false);
      setPendingGenreName("");
    }
  };

  const handleCreateAuthor = async (inputValue: string) => {
  try {
    const newAuthor = await createAuthor({ name: inputValue }).unwrap();
    console.log("response", newAuthor);

    const newOption: OptionType = {
      label: newAuthor?.name ?? inputValue,
      value: newAuthor?.id ?? Date.now(), // fallback ID if not returned
    };

    onAuthorsChange([...selectedAuthors, newOption]);
  } catch (err) {
    console.error("Author creation failed", err);
    alert("Error creating author.");
  }
};


  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700">Authors</label>
        <CreatableSelect
          isMulti
          isLoading={authorLoading}
          options={authorOptions}
          value={selectedAuthors}
          onChange={(value) => onAuthorsChange(value as OptionType[])}
          onCreateOption={handleCreateAuthor}
          placeholder="Select or create authors..."
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Genres</label>
        <CreatableSelect
          isMulti
          isLoading={genreLoading}
          options={genreOptions}
          value={selectedGenres}
          onChange={(value) => onGenresChange(value as OptionType[])}
          onCreateOption={handleCreateGenre}
          placeholder="Select or create genres..."
        />
      </div>

      <GenreDescriptionModal
        isOpen={isModalOpen}
        genreName={pendingGenreName}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleGenreSubmit}
      />
    </div>
  );
};

export default AuthorGenreSelect;
