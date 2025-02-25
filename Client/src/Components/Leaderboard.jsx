// import { useState, useEffect } from 'react';
// import { useUser, useAuth } from '@clerk/clerk-react';

// const Leaderboard = () => {
//   const { user } = useUser();
//   const { session } = useAuth();
//   const [leaderboardData, setLeaderboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       if (!session || !session.user) {
//         setError('User not authenticated');
//         setLoading(false);
//         return;
//       }

//       try {
//         const token = await session.getToken(); // Get the token from session
//         const response = await fetch('http://waymax-production.up.railway.app/api/leaderboard', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch leaderboard: ${response.statusText}`);
//         }

//         const data = await response.json();
//         setLeaderboardData(data);
//       } catch (error) {
//         console.error('Error fetching leaderboard:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeaderboard();
//   }, [session]);

//   if (loading) {
//     return <div className="text-center p-4">Loading leaderboard...</div>;
//   }

//   if (error) {
//     return <div className="text-center p-4 text-red-500">{error}</div>;
//   }

//   const isInTop25 = leaderboardData?.top25.some(
//     player => player.clerkId === leaderboardData.currentUser.clerkId
//   );

//   return (
//     <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
//       {/* Header Section */}
//       <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//           XP Leaderboard
//         </h2>
//       </div>

//       {/* Content Section */}
//       <div className="p-6">
//         <div className="space-y-4">
//           {/* Top 25 List */}
//           <div className="space-y-2">
//             {leaderboardData?.top25?.map((player, index) => (
//               <div
//                 key={player.clerkId}
//                 className={`flex items-center justify-between p-2 rounded ${
//                   player.clerkId === leaderboardData.currentUser.clerkId
//                     ? 'bg-blue-100 dark:bg-blue-900'
//                     : 'bg-gray-50 dark:bg-gray-800'
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <span className="font-bold w-8">{index + 1}</span>
//                   <span>{player.username}</span>
//                 </div>
//                 <span className="font-semibold">{player.xp.toLocaleString()} XP</span>
//               </div>
//             ))}
//           </div>

//           {/* Current User Status (if not in top 25) */}
//           {!isInTop25 && leaderboardData?.currentUser && (
//             <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
//               <div className="flex items-center justify-between bg-yellow-50 dark:bg-yellow-900 p-3 rounded">
//                 <div className="flex items-center gap-3">
//                   <span className="font-bold w-8">
//                     {leaderboardData.currentUser.rank}
//                   </span>
//                   <span>{leaderboardData.currentUser.username} (You)</span>
//                 </div>
//                 <span className="font-semibold">
//                   {leaderboardData.currentUser.xp.toLocaleString()} XP
//                 </span>
//               </div>
//               <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
//                 Keep practicing! You need {
//                   leaderboardData.top25[24]?.xp - leaderboardData.currentUser.xp
//                 } more XP to reach the top 25!
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;
