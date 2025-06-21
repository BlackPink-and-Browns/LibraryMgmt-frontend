import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.ts";

import {
  Login,
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
import Issuedbook from "./pages/admindashboard/books/Issuedbook.tsx";
import ShelfBooks from "./pages/admindashboard/shelf/ShelfBooks.tsx";
import EmployeeDashboard from "./pages/employeedashboard/EmployeeDashboard.tsx";
import ReturnBook from "./pages/employeedashboard/returnbook/ReturnBook.tsx";
import BorrowedBookRecords from "./pages/employeedashboard/borrowedBookRecord.tsx";
import OverdueBooks from "./components/OverdueBooksModal.tsx";
import AuthorDetails from "./pages/explore/Author.tsx";
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "explore",
    
        element: <ExploreLayout />,
        children: [
          { path: "", element: <BookCatalog /> },
          { path: "details/:bookId", element: <BookDetails /> },
          { path: "author/:authorId", element: <AuthorDetails /> },
        ],
      },

  {
    path: "dashboard",
        element: <ExploreLayout />,
        children: [
          { path: "", element: <EmployeeDashboard /> },
          { path: "returnbook/:bookId", element: <ReturnBook /> },
          { path: "details/:bookId", element: <BookDetails /> },
          { path: "borrowHistory/:bookId", element: <BorrowedBookRecords /> },
          { path: "overdue", element: <OverdueBooks/> },
        ],
      },
  {
    path: "admin",
    element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
    children: [
      {
        path: "",
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
              { path: "book-list/:id", element: <BookDetail /> },
              { path: "issued", element: <Issuedbook /> },
            ],
          },
          {
            path: "shelf",
            element: <Shelf />,
            children: [
              { path: "add-shelf", element: <AddShelf /> },
              { path: "shelf-list", element: <ListShelf /> },
              { path: "shelf-list/:id", element: <ShelfBooks /> },
            ],
          },
          { path: "users", element: <UserList /> },
          { path: "users/:userId", element: <UserDetail /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
function App() {
  return (
    <Provider store={store}>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={router} />
    </Provider>
  );
}
export default App;