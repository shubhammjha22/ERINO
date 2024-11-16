import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users } from "lucide-react";
import ContactTable from "./components/ContactTable";
import ContactForm from "./components/ContactForm";
import Header from "./components/Header";
import { useFetchContacts } from "./useUtil";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactEditForm from "./components/ContactEditForm";
import DeleteModal from "./components/DeleteModal";
import { BACKEND_URL } from "./config";

function App() {
  const [contacts, setContacts] = useState([]);
  const { loading, data, setReload, error } = useFetchContacts();

  useEffect(() => {
    if (!loading) {
      setContacts(data);
    }
  }, [loading]);
  const [showForm, setShowForm] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, val: null });
  const [showEditForm, setShowEditForm] = useState({ show: false, val: null });
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortDirection("asc");
    }
  };

  const sortedContacts = Array.isArray(contacts)
    ? [...contacts].sort((a, b) => {
        const aValue = a[sortBy]?.toLowerCase() || "";
        const bValue = b[sortBy]?.toLowerCase() || "";

        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      })
    : [];

  const handleEdit = (id) => {
    setShowEditForm({ show: true, val: id });
  };

  const handleSubmit = async (formData) => {
    console.log("inside handle submit -", formData);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/contacts`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        company: formData.company,
        jobTitle: formData.jobTitle,
      });
      console.log(res.data.message);
      toast.success(res.data.message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setShowForm(false);
      setReload((prev) => !prev);
    } catch (error) {
      console.log("error is ", error);

      toast.warn(`${error.response.data.message}`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    // setLoading(true);
  };

  const handleEditSubmit = async (formData) => {
    console.log("inside handle submit -", formData);
    const id = showEditForm.val;
    try {
      const res = await axios.put(`${BACKEND_URL}/api/v1/contacts/${id}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        company: formData.company,
        jobTitle: formData.jobTitle,
      });
      console.log(res.data.message);
      toast.success(res.data.message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setShowEditForm({ show: false, val: null });
      setReload((prev) => !prev);
    } catch (error) {
      console.log("error is ", error);

      toast.warn(`${error.response.data.message}`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    // setLoading(true);
  };

  const handleDelete = async (id) => {
    console.log("inside delete  -", id);
    // setShowEditForm((prev)=>({ ...prev, val:id}))
    setDeleteModal({ show: true, val: id });
  };

  const handleConfirmedDelete = async () => {
    const id = deleteModal.val;

    try {
      const res = await axios.delete(`${BACKEND_URL}/api/v1/contacts/${id}`);
      console.log(res.data.message);
      toast.success(res.data.message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      // setShowEditForm({ show: false, val: null });
      setDeleteModal({ show: false, val: null });
      setReload((prev) => !prev);
    } catch (error) {
      console.log("error is ", error);

      toast.warn(`${error.response.data.message}`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  // console.log("loading here ,", loading);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Header setShowForm={setShowForm} />
          {error && <div>{error}</div>}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />

          {contacts?.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Users size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No contacts yet
              </h3>
              <p className="text-gray-500">
                Get started by adding your first contact
              </p>
            </motion.div>
          ) : !loading ? (
            <ContactTable
              contacts={sortedContacts}
              onEdit={handleEdit}
              onDelete={handleDelete}
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSort={handleSort}
              loading={loading}
            />
          ) : (
            <div>Loading... </div>
          )}

          <AnimatePresence>
            {showForm && (
              <ContactForm
                onSubmit={handleSubmit}
                onClose={() => setShowForm(false)}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showEditForm.show && (
              <ContactEditForm
                contact={contacts.find(
                  (contact) => contact.id === showEditForm.val
                )}
                id={showEditForm.val}
                onSubmit={handleEditSubmit}
                onClose={() => (
                  console.log("cliched on close"),
                  setShowEditForm({ show: false, val: null })
                )}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {deleteModal.show && (
              <DeleteModal
                open={open}
                onClose={() => setDeleteModal(false)}
                onConfirm={handleConfirmedDelete}
                message="Are you sure you want to delete this contact?"
              />
            )}
          </AnimatePresence>

          {/* <EnhancedTable /> */}
        </div>
      </div>
    </>
  );
}

export default App;
