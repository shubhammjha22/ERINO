import { motion } from "motion/react";
import { Plus, Users } from "lucide-react";

export default function Header({ setShowForm }) {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Users size={32} className="text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add Contact
        </motion.button>
      </div>
    </>
  );
}
