const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌ Missing Supabase URL or Key in .env");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function initDB() {
  try {
    console.log('🚀 Connecting to Supabase...');

    const { count: tourCount } = await supabase.from('tournaments').select('*', { count: 'exact', head: true });
    if (tourCount === 0) {
      await seedTournaments();
    }

    const { count: lbCount } = await supabase.from('leaderboard').select('*', { count: 'exact', head: true });
    if (lbCount === 0) {
      await seedLeaderboard();
    }

    console.log('✅ Supabase Connection & Initialization Complete!');
  } catch (err) {
    console.error('❌ Supabase Init Error:', err);
    process.exit(1);
  }
}

async function seedTournaments() {
  const tournaments = [
    // ===== LIVE TOURNAMENTS =====
    {
      title: 'NODWIN BGMI Masters Series S3',
      game: 'BGMI', status: 'live',
      prize_pool: '₹10,00,000', slots: 64, slots_filled: 64,
      start_date: '2026-04-15', end_date: '2026-04-25',
      registration_deadline: '2026-04-12',
      location: 'Online — All India',
      organizer: 'NODWIN Gaming',
      banner_color: '#FF6B35',
      description: 'NODWIN Gaming presents the biggest BGMI Masters Series Season 3. 64 elite squads battle for a massive ₹10 Lakh prize pool. India\'s top squads converge in this high-stakes battleground!',
      rules: ['Squad of 4 required', 'No emulators allowed', 'All players must be Indian residents', 'Match points system: #1 – 10pts', 'Fair play policy strictly enforced', 'GFX tool allowed']
    },
    {
      title: 'Garena Free Fire Max India Series 2026',
      game: 'Free Fire Max', status: 'live',
      prize_pool: '₹8,00,000', slots: 48, slots_filled: 45,
      start_date: '2026-04-14', end_date: '2026-04-22',
      registration_deadline: '2026-04-10',
      location: 'Online — Battle Royale Server',
      organizer: 'Garena India',
      banner_color: '#FF9500',
      description: 'The Garena India Series 2026 returns with ₹8 Lakhs on the line! The best Free Fire Max squads across India compete in a survival-of-the-fittest format. Every drop counts.',
      rules: ['4-player squads', 'Account level 30+ required', 'Indian players only', 'No hacks or third-party mods', 'All devices allowed except emulators']
    },
    // ===== UPCOMING TOURNAMENTS =====
    {
      title: 'Valorant India Championship 2026',
      game: 'Valorant', status: 'upcoming',
      prize_pool: '₹5,00,000', slots: 32, slots_filled: 26,
      start_date: '2026-05-03', end_date: '2026-05-10',
      registration_deadline: '2026-04-28',
      location: 'Online — India Server',
      organizer: 'Riot Games India',
      banner_color: '#FF4655',
      description: 'Riot Games India presents the 2026 Valorant India Championship. 32 of India\'s sharpest agents go head-to-head in a double-elimination bracket to claim the title and ₹5 Lakh prize!',
      rules: ['5-player teams + 1 substitute', 'Minimum rank: Diamond III', 'Indian accounts only', 'No account sharing', 'All agents allowed', 'Standard competitive rules apply']
    },
    {
      title: 'Krafton BGMI Invitational Cup 2026',
      game: 'BGMI', status: 'upcoming',
      prize_pool: '₹7,00,000', slots: 32, slots_filled: 24,
      start_date: '2026-05-12', end_date: '2026-05-18',
      registration_deadline: '2026-05-05',
      location: 'Online — Erangel Classic Server',
      organizer: 'Krafton India',
      banner_color: '#10B981',
      description: 'Krafton India\'s official Invitational Cup 2026 gathers India\'s most skilled BGMI squads. 32 teams, 6 match days, and ₹7 Lakh to be claimed by the best squad in India.',
      rules: ['Only Krafton-invited & qualifier teams', 'Squad of 4 + 1 sub allowed', 'Must have competed in a state-level tournament', 'Stream sniping = instant disqualification']
    },
    {
      title: 'ESL India CS2 Pro League S2',
      game: 'CS2', status: 'upcoming',
      prize_pool: '₹4,00,000', slots: 16, slots_filled: 10,
      start_date: '2026-05-20', end_date: '2026-05-25',
      registration_deadline: '2026-05-15',
      location: 'Online — Mumbai & Delhi Servers',
      organizer: 'ESL India',
      banner_color: '#F59E0B',
      description: 'ESL India returns with the CS2 Pro League Season 2. 16 powerhouse Indian teams face off for ₹4 Lakhs in a LAN-style online format with pro production and casting.',
      rules: ['5 players + 1 stand-in maximum', 'Minimum Prime rank required', 'No VAC or game bans', 'Indian residents only', 'Use of external software prohibited']
    },
    {
      title: 'MLBB India National Championship 2026',
      game: 'MLBB', status: 'upcoming',
      prize_pool: '₹3,00,000', slots: 32, slots_filled: 18,
      start_date: '2026-05-28', end_date: '2026-06-05',
      registration_deadline: '2026-05-22',
      location: 'Online — India Server',
      organizer: 'Moonton India',
      banner_color: '#06B6D4',
      description: 'Moonton India presents the 2026 Mobile Legends National Championship. Battle in the Land of Dawn with 32 elite Indian teams! Best of 5 playoffs with ₹3 Lakh prize pool.',
      rules: ['5 players + 1 sub per team', 'Minimum Mythic rank required', 'Must be Indian residents', 'No smurfing — accounts verified', 'Bans & picks: 5-3-1 system']
    },
    {
      title: 'Tekken 8 India Grand Slam',
      game: 'Tekken 8', status: 'upcoming',
      prize_pool: '₹1,50,000', slots: 128, slots_filled: 87,
      start_date: '2026-06-07', end_date: '2026-06-08',
      registration_deadline: '2026-06-04',
      location: 'Online — Fighting Game Community',
      organizer: 'Bandai Namco India',
      banner_color: '#EC4899',
      description: 'India\'s premier Tekken 8 Grand Slam is back! 128 fighters, single-player brackets, double elimination. Who will be crowned India\'s best Tekken 8 player with ₹1.5 Lakh?',
      rules: ['1v1 singles bracket', 'Double elimination format', 'All characters and DLCs allowed', 'Best of 3, Finals Best of 5', 'Random stage selection']
    },
    {
      title: 'Clash Royale India Open 2026',
      game: 'Clash Royale', status: 'upcoming',
      prize_pool: '₹1,00,000', slots: 64, slots_filled: 38,
      start_date: '2026-06-15', end_date: '2026-06-16',
      registration_deadline: '2026-06-12',
      location: 'Online — Mobile',
      organizer: 'Supercell India Hub',
      banner_color: '#3B82F6',
      description: 'Clash Royale India Open 2026 — the biggest mobile card battle tournament in India. ₹1 Lakh prize awaits the ultimate strategist in India!',
      rules: ['Solo players only', 'Must be King Level 14+', 'No account sharing', 'Indian accounts only', 'Standard ladder deck rules']
    },
    // ===== PAST TOURNAMENTS =====
    {
      title: 'BGMI All India Pro Series S2 — 2025',
      game: 'BGMI', status: 'past',
      prize_pool: '₹12,00,000', slots: 64, slots_filled: 64,
      start_date: '2025-12-01', end_date: '2025-12-15',
      registration_deadline: '2025-11-25',
      location: 'Offline + Online — New Delhi',
      organizer: 'NODWIN Gaming',
      banner_color: '#FF6B35',
      description: 'The BGMI All India Pro Series Season 2 was the largest BGMI event of 2025 with a ₹12 Lakh prize pool. Team SoulS took home the title after a nail-biting final.',
      rules: ['Squad of 4', 'Offline LAN finals', 'Top 16 teams from online qualifiers']
    },
    {
      title: 'Valorant Conquerors Championship India 2025',
      game: 'Valorant', status: 'past',
      prize_pool: '₹6,00,000', slots: 32, slots_filled: 32,
      start_date: '2025-11-10', end_date: '2025-11-18',
      registration_deadline: '2025-11-02',
      location: 'Online — India Server',
      organizer: 'NODWIN × Riot India',
      banner_color: '#FF4655',
      description: 'The Valorant Conquerors Championship returned in 2025 with ₹6 Lakh on the line. GE Force edged out Revenant Esports India in a thrilling 3-2 Grand Final.',
      rules: ['5v5 team format', 'Double elimination', 'All Indian players']
    }
  ];

  await supabase.from('tournaments').insert(tournaments);
  console.log('✅ Tournaments seeded');
}

async function seedLeaderboard() {
  const players = [
    // BGMI
    { player_name: 'Jonathan', game: 'BGMI', state: 'Goa', rank: 1, points: 12500, wins: 78, tournaments_played: 95, avatar_color: '#FF6B35' },
    { player_name: 'Mortal', game: 'BGMI', state: 'Delhi', rank: 2, points: 11800, wins: 71, tournaments_played: 90, avatar_color: '#7B2FFF' },
    { player_name: 'Scout', game: 'BGMI', state: 'Punjab', rank: 3, points: 11200, wins: 65, tournaments_played: 85, avatar_color: '#00F3FF' },
    { player_name: 'Ronak', game: 'BGMI', state: 'Rajasthan', rank: 4, points: 10700, wins: 60, tournaments_played: 78, avatar_color: '#FF9500' },
    { player_name: 'GodL_Mavi', game: 'BGMI', state: 'Haryana', rank: 5, points: 10200, wins: 55, tournaments_played: 72, avatar_color: '#10B981' },
    // Valorant
    { player_name: 'Reg1na', game: 'Valorant', state: 'Kerala', rank: 1, points: 11900, wins: 58, tournaments_played: 67, avatar_color: '#FF4655' },
    { player_name: 'Lightningfast', game: 'Valorant', state: 'Karnataka', rank: 2, points: 11300, wins: 52, tournaments_played: 62, avatar_color: '#FF9500' },
    { player_name: 'SkRossi', game: 'Valorant', state: 'Tamil Nadu', rank: 3, points: 10800, wins: 48, tournaments_played: 58, avatar_color: '#10B981' },
    { player_name: 'Vyse', game: 'Valorant', state: 'Maharashtra', rank: 4, points: 10200, wins: 44, tournaments_played: 54, avatar_color: '#8B5CF6' },
    { player_name: 'Marzil', game: 'Valorant', state: 'Telangana', rank: 5, points: 9700, wins: 40, tournaments_played: 50, avatar_color: '#06B6D4' },
    // Free Fire Max
    { player_name: 'Badge99', game: 'Free Fire Max', state: 'Tamil Nadu', rank: 1, points: 12800, wins: 88, tournaments_played: 105, avatar_color: '#FF9500' },
    { player_name: 'Nobru_IND', game: 'Free Fire Max', state: 'Maharashtra', rank: 2, points: 12100, wins: 80, tournaments_played: 98, avatar_color: '#EC4899' },
    { player_name: 'Two-side Gamers', game: 'Free Fire Max', state: 'Assam', rank: 3, points: 11500, wins: 74, tournaments_played: 90, avatar_color: '#8B5CF6' },
    { player_name: 'Raistar', game: 'Free Fire Max', state: 'Gujarat', rank: 4, points: 10900, wins: 68, tournaments_played: 84, avatar_color: '#FF6B35' },
    { player_name: 'Pahadi FF', game: 'Free Fire Max', state: 'Uttarakhand', rank: 5, points: 10300, wins: 62, tournaments_played: 78, avatar_color: '#10B981' },
    // CS2
    { player_name: 'f0rsaken', game: 'CS2', state: 'Tamil Nadu', rank: 1, points: 11600, wins: 42, tournaments_played: 55, avatar_color: '#F59E0B' },
    { player_name: 'Menace', game: 'CS2', state: 'Maharashtra', rank: 2, points: 11000, wins: 38, tournaments_played: 50, avatar_color: '#06B6D4' },
    { player_name: 'brutmonster', game: 'CS2', state: 'Delhi', rank: 3, points: 10400, wins: 34, tournaments_played: 45, avatar_color: '#FF2D78' },
    // MLBB
    { player_name: 'Kaisar', game: 'MLBB', state: 'Assam', rank: 1, points: 10500, wins: 45, tournaments_played: 58, avatar_color: '#06B6D4' },
    { player_name: 'Ganesh', game: 'MLBB', state: 'Karnataka', rank: 2, points: 9900, wins: 40, tournaments_played: 52, avatar_color: '#7B2FFF' },
    { player_name: 'YourFriend', game: 'MLBB', state: 'West Bengal', rank: 3, points: 9400, wins: 36, tournaments_played: 47, avatar_color: '#FF9500' },
  ];

  await supabase.from('leaderboard').insert(players);
  console.log('✅ Leaderboard seeded');
}

module.exports = { initDB, supabase };
