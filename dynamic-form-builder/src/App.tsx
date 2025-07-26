import { useEffect, useState } from "react";
import DynamicForm from "./components/DynamicForm";
import { FormSchema } from "./types/schema";

function App() {
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://sharejson.com/api/v1/uzjxOUc_5VccqT-1XiEYf")
      .then((res) => res.json())
      .then((data) => {
        setSchema(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load schema", err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (data: Record<string, any>) => {
    console.log("Form Submitted:", data);
  };

  if (loading) return <p>Loading form...</p>;
  if (!schema) return <p>Failed to load form schema.</p>;

  return <DynamicForm schema={schema} onSubmit={handleSubmit} />;
}

export default App;
