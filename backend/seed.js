// backend/seed.js
// Run this ONCE after setup to fill your database with sample blog posts
// Usage: node seed.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.model.js";
import Blog from "./models/Blog.model.js";

dotenv.config();

const sampleBlogs = [
  {
    title: "Getting Started with the MERN Stack",
    category: "Technology",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    tags: ["mern", "javascript", "react", "nodejs"],
    content: `<p>The MERN stack is one of the most popular full-stack combinations for building modern web applications. It stands for <strong>MongoDB, Express.js, React, and Node.js</strong> — and together, they let you build end-to-end JavaScript applications.</p>
<h2>Why MERN?</h2>
<p>Using JavaScript on both the frontend and backend means you only need to master one language. This dramatically reduces context switching and speeds up development.</p>
<h2>The Four Pieces</h2>
<p><strong>MongoDB</strong> is a NoSQL database that stores data as JSON-like documents. It's flexible, scalable, and pairs naturally with JavaScript objects.</p>
<p><strong>Express.js</strong> is a minimal web framework for Node.js. It makes defining API routes and handling HTTP requests straightforward.</p>
<p><strong>React</strong> is Facebook's library for building user interfaces. Its component model and virtual DOM make UIs fast and maintainable.</p>
<p><strong>Node.js</strong> lets you run JavaScript on the server. It uses an event-driven, non-blocking I/O model that makes it efficient for real-time applications.</p>
<h2>Getting Started</h2>
<p>The best way to learn MERN is to build something. Start with a simple CRUD app — like a blog or a bookstore — and grow from there. Each small project builds your intuition for how the pieces fit together.</p>
<blockquote>The stack doesn't matter as much as the ability to ship working products.</blockquote>
<p>Happy coding!</p>`,
  },
  {
    title: "Understanding JWT Authentication",
    category: "Technology",
    coverImage: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800",
    tags: ["jwt", "auth", "security", "backend"],
    content: `<p>JSON Web Tokens (JWT) are one of the most widely used methods for handling authentication in web applications. But how do they actually work?</p>
<h2>What Is a JWT?</h2>
<p>A JWT is a compact, self-contained token that encodes information as a JSON object. It has three parts separated by dots: <strong>header.payload.signature</strong>.</p>
<ul>
<li><strong>Header</strong> — contains the token type and hashing algorithm</li>
<li><strong>Payload</strong> — contains the data (called "claims"), like user ID and role</li>
<li><strong>Signature</strong> — verifies the token hasn't been tampered with</li>
</ul>
<h2>How Authentication Works</h2>
<p>When a user logs in, the server generates a JWT signed with a secret key and sends it to the client. The client stores it (usually in localStorage) and sends it back with every request in the Authorization header.</p>
<p>The server then verifies the signature on every request — if the token is valid, the user is authenticated without needing to hit the database every time.</p>
<h2>When to Use JWT</h2>
<p>JWT is great for stateless APIs and microservices. Since the token carries its own data, your server doesn't need to store session state. However, because tokens can't be invalidated before expiry, always set short expiry times and use refresh token patterns for long sessions.</p>
<blockquote>Security is not a feature, it's a foundation. Build it in from day one.</blockquote>`,
  },
  {
    title: "Why Every Developer Should Learn DSA",
    category: "Education",
    coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800",
    tags: ["dsa", "algorithms", "career", "leetcode"],
    content: `<p>Data Structures and Algorithms (DSA) often feel intimidating at first — but they are one of the most valuable investments a developer can make in their career.</p>
<h2>It's Not About Memorizing Solutions</h2>
<p>The point of DSA practice isn't to memorize answers to specific problems. It's about training your brain to break down complex problems systematically, recognize patterns, and think about trade-offs between time and space complexity.</p>
<h2>Real-World Impact</h2>
<p>Even if you never implement a red-black tree on the job, understanding why certain data structures exist helps you make better choices. Knowing when to use a HashMap vs a sorted array, or when recursion is cleaner than iteration — these are skills that show up constantly in real codebases.</p>
<h2>How to Practice</h2>
<ul>
<li>Start with arrays, strings, and hashmaps — they cover ~60% of interview questions</li>
<li>Move to trees, graphs, and dynamic programming</li>
<li>Use platforms like LeetCode — aim for consistency over intensity</li>
<li>Solve 1–2 problems daily rather than 10 in one sitting</li>
</ul>
<p>At 600+ LeetCode problems, you'll start to see patterns repeat. The investment absolutely pays off.</p>
<blockquote>Consistent daily practice beats sporadic cramming every time.</blockquote>`,
  },
  {
    title: "A Morning in Varanasi — Where Time Stands Still",
    category: "Travel",
    coverImage: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=800",
    tags: ["india", "travel", "varanasi", "culture"],
    content: `<p>There is no place quite like Varanasi. One of the world's oldest continuously inhabited cities, it sits on the banks of the sacred Ganga and holds a kind of spiritual gravity that is difficult to describe and impossible to forget.</p>
<h2>The Ghats at Dawn</h2>
<p>Wake before sunrise and walk to the ghats. As the first light touches the river, you'll witness the <em>Ganga Aarti</em> and the daily ritual bathing that has happened here for thousands of years. Boats glide quietly through the mist. Temple bells ring in the distance.</p>
<p>The Dashashwamedh Ghat is the most prominent, but the smaller ghats — Assi, Manikarnika — offer a more intimate experience of the city's spiritual life.</p>
<h2>Getting Lost in the Lanes</h2>
<p>The city's narrow alleyways, called <em>galis</em>, are a world unto themselves. You'll find tiny temples tucked beside silk shops, students reciting ancient texts, and the smell of chai mixing with incense.</p>
<p>It's easy to lose your sense of time here — which is perhaps the whole point. In a city where the living and the eternal coexist, hurrying feels wrong.</p>
<blockquote>To see Varanasi is to look at India's soul directly in the face.</blockquote>`,
  },
  {
    title: "How to Stay Productive as a Student Developer",
    category: "Lifestyle",
    coverImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800",
    tags: ["productivity", "study", "developer", "tips"],
    content: `<p>Balancing academics and personal projects is one of the hardest things about being a student developer. Here's what actually works.</p>
<h2>Time-block, Don't Multi-task</h2>
<p>Set aside dedicated slots for coding projects — even 90 minutes of focused work beats 4 hours of distracted effort. Use a timer. When the block ends, actually stop. Rest is part of the process.</p>
<h2>Build Projects, Don't Just Follow Tutorials</h2>
<p>Tutorials are useful for learning syntax and patterns. But the real learning happens when you get stuck on your own project and have to figure things out. That struggle is where understanding grows.</p>
<h2>Learn to Say No</h2>
<p>Every time you say yes to something low-value, you're saying no to something important. Protect your deep work time fiercely. This doesn't mean being antisocial — it means being intentional.</p>
<h2>Keep a Working Log</h2>
<p>At the end of each coding session, write 2–3 sentences about what you built, what broke, and what you learned. After a few months, this log becomes incredibly motivating to look back on.</p>
<blockquote>The goal isn't to be the busiest developer — it's to be the most effective one.</blockquote>`,
  },
  {
    title: "Understanding React Context API",
    category: "Technology",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    tags: ["react", "context", "state", "hooks"],
    content: `<p>When your React app grows beyond a few components, passing data through props at every level becomes painful. This is called "prop drilling" — and the Context API is React's built-in solution.</p>
<h2>What Is Context?</h2>
<p>Context creates a "global container" that any component in your tree can read from, without needing it passed down through every intermediate component. Think of it like a radio broadcast — components can "tune in" to receive the data they need.</p>
<h2>Three Steps to Use Context</h2>
<ul>
<li><strong>Create:</strong> <code>const MyContext = createContext(null)</code></li>
<li><strong>Provide:</strong> Wrap your component tree with <code>&lt;MyContext.Provider value={data}&gt;</code></li>
<li><strong>Consume:</strong> Use <code>const data = useContext(MyContext)</code> in any child component</li>
</ul>
<h2>When to Use Context vs State</h2>
<p>Use local state (<code>useState</code>) for data that only one component needs. Use Context for data that many components across your app need — like the current user, theme, or cart contents.</p>
<p>Context isn't a replacement for proper state management libraries like Redux or Zustand — but for most small to medium apps, it's more than enough.</p>
<blockquote>The best architecture is the simplest one that solves your actual problem.</blockquote>`,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Find or create an admin user to be the author of seeded posts
    let admin = await User.findOne({ role: "admin" });

    if (!admin) {
      admin = await User.create({
        name: "Mohipal Kumar",
        email: "admin@blog.com",
        password: "admin123",
        role: "admin",
      });
      console.log("✅ Admin user created: admin@blog.com / admin123");
    }

    // Clear existing blogs
    await Blog.deleteMany({});
    console.log("🗑️  Cleared existing blogs");

    // Insert sample blogs with this admin as author
    const blogDocs = sampleBlogs.map((b) => ({ ...b, author: admin._id }));
    await Blog.insertMany(blogDocs);

    console.log(`✅ Seeded ${sampleBlogs.length} blog posts!`);
    console.log("\n🎉 Done! Login with:");
    console.log("   Email:    admin@blog.com");
    console.log("   Password: admin123");
    console.log("   Role:     admin (can create, edit, delete blogs)\n");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
};

seed();
