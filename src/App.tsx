import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  Login,
  BookCard,
  BookCatalog,
  ExploreLayout,
  NotFound,
  BookDetails,
} from "./pages";

import AdminLayout from "./pages/adminlayout/AdminLayout";
import AdminDashboard from "./pages/admindashboard/AdminDashboard";
import Addbook from "./pages/admindashboard/books/Addbook.tsx";
import BulkUpload from "./pages/admindashboard/books/BulkUpload";
import Books from "./pages/admindashboard/books/Books";
import ScanIsbn from "./pages/admindashboard/books/ScanIsbn";
import Shelf from "./pages/admindashboard/shelf/Shelf";
import AddShelf from "./pages/admindashboard/shelf/AddShelf.tsx";
import ListShelf from "./pages/admindashboard/shelf/ListShelf.tsx";
import UserList from "./pages/admindashboard/userlist/UserList";
import UserDetail from "./pages/admindashboard/userlist/UserDetail.tsx";
import BookList from "./pages/admindashboard/books/BookList.tsx";
import AddBookCopy from "./pages/admindashboard/books/AddBookCopy.tsx";
import BookDetail from "./pages/admindashboard/books/BookDetail.tsx";
import EmployeeDashboard from "./pages/employeedashboard/EmployeeDashboard.tsx";
import ReturnBook from "./pages/employeedashboard/returnbook/ReturnBook.tsx";
import BorrowedBookRecords from "./pages/employeedashboard/borrowedBookRecord.tsx";
import Issuedbook from "./pages/admindashboard/books/Issuedbook.tsx";
<<<<<<< Updated upstream
import AuthorDetails from "./pages/explore/Author.tsx";
=======
import OverdueBooks from "./components/OverdueBooksModal.tsx";
>>>>>>> Stashed changes

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: ":id/explore",
    element: <ExploreLayout />,
    children: [
      { path: "", element: <BookCatalog /> },
      { path: ":bookId/details", element: <BookDetails /> },
      { path: ":author", element: <AuthorDetails /> }
    ],
  },
  {
    path: ":id/dashboard",
    element: <ExploreLayout />,
    children: [
      { path: "", element: <EmployeeDashboard /> },
      { path: "returnbook/:bookId", element: <ReturnBook /> },
      { path: "details/:bookId", element: <BookDetails /> },
      { path: "borrowHistory/:bookId", element: <BorrowedBookRecords /> },
      {  path: "overdue", element: <OverdueBooks /> },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      { path: "", element: <AdminDashboard /> },
      {
        path: "books",
        element: <Books />,
        children: [
          { path: "add-book", element: <Addbook /> },
          { path: "add-book/:id", element: <Addbook /> },
          { path: "add-copy", element: <AddBookCopy /> },
          { path: "bulk-upload", element: <BulkUpload /> },
          { path: "scan-isbn", element: <ScanIsbn /> },
          { path: "book-list", element: <BookList /> },
          { path: "issued", element: <Issuedbook/> },
          { path: "book-list/:id", element: <BookDetail /> },
        ],
      },
      {
        path: "shelf",
        element: <Shelf />,
        children: [
          { path: "add-shelf", element: <AddShelf /> },
          { path: "shelf-list", element: <ListShelf /> },
        ],
      },
      { path: "users", element: <UserList /> },
      { path: "users/:userId", element: <UserDetail /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
