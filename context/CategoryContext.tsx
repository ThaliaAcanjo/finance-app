import React, { createContext, useContext, useState} from "react";
import { v4 as uuidv4 } from "uuid"; // Para gerar ID único

type Category = {
    id: string;
    description: string;
    icon: string;
    color: string;
};

type categories = Category[];

type CategoryContextType = {
    categories: categories;
    addCategory: (category: Category) => void;
    removeCategory: (id: string) => void;
    updateCategory: (id: string, updated: Partial<Category>) => void;
    deleteCategory: (id: string) => void;
};

// export const CategoryContext = React.createContext();
export const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const useCategory = (): CategoryContextType => {
  const context = useContext(CategoryContext);
  if (!context) throw new Error("useCategory must be used within a CategoryProvider");
  return context;
};

export  function CategoryProvider({ children }: { children: React.ReactNode }) {
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [lastId, setLastId] = useState(0);

    function addCategory(category: Omit<Category, 'id'>) {
        console.log(category);
        setLastId(prev => prev + 1);

        setCategories((prev) => [...prev, { ...category, id: uuidv4() }]);
    }

    function removeCategory(id: string) {
        setCategories((prevCategories) =>
            prevCategories.filter((cat) => cat.id !== id)
        );
    }

    function updateCategory(id: string, updated: Partial<Category>) {
        setCategories((prev) =>
            prev.map((category) => (category.id === id ? { ...category, ...updated } : category))
        );
    }

    return (
        <CategoryContext.Provider value={{ categories, addCategory, removeCategory, updateCategory, deleteCategory: removeCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};