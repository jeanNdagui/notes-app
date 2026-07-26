import { eq } from "drizzle-orm"
import { db } from "../../db"
import { notes } from "../../db/schema"

export const getNotes = async (importantOnly: boolean) => {
  return db.query.notes.findMany({
    where: importantOnly ? eq(notes.important, true) : undefined,
  });
};

export const getNoteById = async (id: number) => {
  return db.query.notes.findFirst({
    where: eq(notes.id, id),
  })
}

export const addNote = async (content: string, important: boolean) => {
  await db.insert(notes).values({ content, important })
}

export const toggleImportance = async (id: number) => {
  const note = await getNoteById(id)
  if (note) {
    await db
      .update(notes)
      .set({ important: !note.important })
      .where(eq(notes.id, id))
  }
}


// export const addNote = (content: string, important: boolean) => {
//   notes.push({ id: nextId++, content, important });
// };

// export const getNoteById = (id: number) => {
//   return notes.find((note) => note.id === id);
// };

// export const toggleImportance = (id: number) => {
//   const note = notes.find((note) => note.id === id);
//   if (note) {
//     note.important = !note.important;
//   }

