import React, { useEffect } from "react";

const Testpage = () => {
  // const notes = [
  //   { id: 1, date: "2000-05-15", name: "a" },
  //   { id: 4, date: "2000-05-16", name: "d" },
  //   { id: 3, date: "2000-06-15", name: "e" },
  //   { id: 5, date: "2001-05-15", name: "f" },
  //   { id: 6, date: "2000-05-15", name: "b" },
  //   { id: 2, date: "2000-05-15", name: "c" },
  // ]; // Step 1: Sort the array based on date
  // const sortedNotes = notes.sort((a, b) => a.date.localeCompare(b.date));

  // // Step 2: Group notes by date
  // const groupedNotes = {};
  // sortedNotes.forEach((note) => {
  //   const { date, name } = note;
  //   if (!groupedNotes[date]) {
  //     groupedNotes[date] = [name];
  //   } else {
  //     groupedNotes[date].push(name);
  //   }
  // });

  // for (const date in groupedNotes) {
  //   const names = groupedNotes[date].join(",");
  //   console.log(`date: ${date}\n${names}\n`);
  // }

  useEffect(() => {
    document.cookie = "test=myWorld";
  }, []);
  return <div>Testpage</div>;
};

export default Testpage;
