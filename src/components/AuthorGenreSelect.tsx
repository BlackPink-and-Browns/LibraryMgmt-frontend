import React, { useMemo } from "react";
import CreatableSelect from "react-select/creatable";
import { useCreateGenreMutation, useGetAllGenreQuery } from "../api-service/genre/genre.api";
import { useCreateAuthorMutation, useGetAllAuthorsQuery } from "../api-service/author/author.api";

type OptionType = {
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

  const handleCreateGenre = async (inputValue: string) => {
    const description = prompt(`Enter a description for genre "${inputValue}"`);
    if (!description) return;

    try {
      const newGenre = await createGenre({ name: inputValue, description }).unwrap();
      const newOption: OptionType = {
        label: newGenre.name,
        value: newGenre.id,
        description: newGenre.description,
      };
      onGenresChange([...selectedGenres, newOption]);
    } catch (err) {
      console.error("Genre creation failed", err);
      alert("Error creating genre.");
    }
  };

  const handleCreateAuthor = async (inputValue: string) => {
    try {
      const newAuthor = await createAuthor({ name: inputValue }).unwrap();
      const newOption: OptionType = {
        label: newAuthor.name,
        value: newAuthor.id,
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
    </div>
  );
};

export default AuthorGenreSelect;
