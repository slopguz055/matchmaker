import { useEffect, useState } from "react";
import { Jam } from "@/common/types/utility";
import { message } from "antd";

export function useOpenJams() {
  const [jams, setJams] = useState<Jam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOpenJams = async () => {
      try {
        const res = await fetch("http://localhost:8080/jams/byState/open");
        if (!res.ok) throw new Error("Error al cargar las jams abiertas");
        const data = await res.json();
        setJams(data);
      } catch (err) {
        const messageText = "No se pudieron cargar las jams abiertas";
        message.error(messageText);
        setError(messageText);
      } finally {
        setLoading(false);
      }
    };

    fetchOpenJams();
  }, []);

  return { jams, loading, error, setJams };
}
