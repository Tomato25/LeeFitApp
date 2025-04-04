import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { startOfWeek, addWeeks, format } from "date-fns";

export const getUsersWithMissingWeeks = async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, "users"));
    const workoutsSnapshot = await getDocs(collection(db, "workouts"));

    const allUsers = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const allWorkouts = workoutsSnapshot.docs.map(doc => doc.data());

    const nextWeekStart = format(addWeeks(startOfWeek(new Date(), { weekStartsOn: 1 }), 1), "yyyy-MM-dd");

    const result = allUsers.map(user => {
      const hasWorkoutNextWeek = allWorkouts.some(
        workout => workout.userId === user.id && workout.weekStart === nextWeekStart
      );
      if (!hasWorkoutNextWeek) {
        return {
          userId: user.id,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          profileImg: user.profileImg || null,
          missingWeeks: [nextWeekStart]
        };
      } else {
        return null;
      }
    }).filter(Boolean);

    return result;
  } catch (error) {
    console.error("Error fetching users or workouts:", error);
    throw error;
  }
};
