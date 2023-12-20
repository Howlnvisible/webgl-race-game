import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export const useScoreboard = () => {
  const [scoreboard, setScoreboard] = useState([]);
  const supabaseUrl = "https://jozstshkzyqnyzyqazif.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvenN0c2hrenlxbnl6eXFhemlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk0MTU5OTEsImV4cCI6MjAwNDk5MTk5MX0.nDIS0KCiNOYdEJoJI5lN_Pc9ayfwvU7Uz0BoCoIaF9c";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const fetchUserResults = async () => {
    let { data: userResults, error } = await supabase
      .from("userResults")
      .select("*")
      .order("result");
    if (error) {
      setScoreboard([]);
    }

    const bestResults = {};
    userResults.forEach((result) => {
      const { username, result: userResult } = result;
      if (!(username in bestResults)) {
        bestResults[username] = userResult;
      }
    });

    const bestResultsArray = Object.entries(bestResults).map(
      ([username, result]) => ({
        username,
        result,
      })
    );

    setScoreboard(bestResultsArray);
  };

  const submitUserResult = async ({ username, result }) => {
    const previousResult = scoreboard.find(
      (item) => item.username === username
    );
    if (previousResult && previousResult.result <= result) {
      return;
    }
    const { data, error } = await supabase
      .from("userResults")
      .insert([
        {
          username: username,
          result: result,
        },
      ])
      .select();
    if (error) {
      toast.error("Servers are down. Failed to send a time record.");
    }
  };

  useEffect(() => {
    fetchUserResults();
  }, []);

  return {
    scoreboard,
    submitUserResult,
  };
};
