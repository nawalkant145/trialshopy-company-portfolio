import mongoose from 'mongoose';
import User from '../models/User.js';
import Product from '../models/Product.js';
import TeamMember from '../models/TeamMember.js';
import Career from '../models/Career.js';
import Testimonial from '../models/Testimonial.js';
import Stats from '../models/Stats.js';

const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@trialshopy.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
  
  const adminExists = await User.findOne({ email: adminEmail });
  if (!adminExists) {
    const admin = new User({
      email: adminEmail,
      password: adminPassword // The pre-save hook will hash this
    });
    await admin.save();
    console.log(`✅ Default admin seeded successfully (${adminEmail})`);
  }
};

const seedStats = async () => {
  const statsExists = await Stats.findOne({ key: 'global' });
  if (!statsExists) {
    const newStats = new Stats({
      key: 'global',
      visitorsCount: 154 // start with some realistic mock hits
    });
    await newStats.save();
    console.log('✅ Global stats visitor counter initialized.');
  }
};

const seedProducts = async () => {
  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    const products = [
      {
        name: "Classic Denim Jacket",
        description: "Timeless streetwear denim jacket with a relaxed fit, custom metal buttons, and premium washed fabric.",
        category: "Outerwear",
        price: 89,
        imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80",
        tryOnLink: "https://trialshopy-ar.vercel.app/try/denim-jacket"
      },
      {
        name: "Casual Linen Shirt",
        description: "Breathable and lightweight long-sleeve linen shirt. Perfect for sunny days and semi-formal outings.",
        category: "Shirts",
        price: 49,
        imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
        tryOnLink: "https://trialshopy-ar.vercel.app/try/linen-shirt"
      },
      {
        name: "Slim Fit Chinos",
        description: "Versatile cotton chinos with a hint of stretch for comfort. Features clean flat-front styling.",
        category: "Pants",
        price: 59,
        imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
        tryOnLink: "https://trialshopy-ar.vercel.app/try/slim-chinos"
      },
      {
        name: "Minimalist Leather Sneakers",
        description: "Sleek low-top sneakers crafted from premium full-grain leather, featuring a comfortable vulcanized sole.",
        category: "Footwear",
        price: 110,
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
        tryOnLink: "https://trialshopy-ar.vercel.app/try/leather-sneakers"
      },
      {
        name: "Heavyweight Cotton Hoodie",
        description: "Ultra-soft cotton fleece hoodie featuring a double-lined hood, ribbed cuffs, and a kangaroo front pocket.",
        category: "Outerwear",
        price: 75,
        imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
        tryOnLink: "https://trialshopy-ar.vercel.app/try/heavy-hoodie"
      },
      {
        name: "Suede Chelsea Boots",
        description: "Classic Chelsea boots styled in rich Italian suede leather. Features double elastic side goring and pull tabs.",
        category: "Footwear",
        price: 145,
        imageUrl: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=600&q=80",
        tryOnLink: "https://trialshopy-ar.vercel.app/try/chelsea-boots"
      },
      {
        name: "Active Gym Shorts",
        description: "Engineered with moisture-wicking technology and a lightweight build to optimize workout performance.",
        category: "Athletic",
        price: 35,
        imageUrl: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80",
        tryOnLink: "https://trialshopy-ar.vercel.app/try/gym-shorts"
      },
      {
        name: "Performance Dry-Fit T-Shirt",
        description: "High-grade polyester running shirt offering optimal ventilation and comfort for endurance sports.",
        category: "Athletic",
        price: 29,
        imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80",
        tryOnLink: "https://trialshopy-ar.vercel.app/try/dryfit-tee"
      },
      {
        name: "Summer Floral Dress",
        description: "Elegant, flowing floral A-line dress crafted with premium georgette fabric. Ideal for brunch outings.",
        category: "Dresses",
        price: 95,
        imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
        tryOnLink: "https://trialshopy-ar.vercel.app/try/floral-dress"
      },
      {
        name: "Structured Trench Coat",
        description: "Double-breasted trench coat with structured shoulders, waist belt, and signature rain flaps.",
        category: "Outerwear",
        price: 180,
        imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
        tryOnLink: "https://trialshopy-ar.vercel.app/try/trench-coat"
      }
    ];
    await Product.insertMany(products);
    console.log("✅ Seeded 10 products successfully.");
  }
};

const seedTeamMembers = async () => {
  const teamCount = await TeamMember.countDocuments();
  if (teamCount === 0) {
    const team = [
      {
        name: "Nikhil Choudhary",
        role: "Founder & CEO",
        category: "founder",
        bio: "Visionary entrepreneur and AI enthusiast. Nikhil leads TrialShopy's mission to bridge the gap between digital e-commerce and physical retail experiences.",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80"
      },
      {
        name: "Dr. Ananya Sen",
        role: "Chief Technology Officer & Head of AI",
        category: "core",
        bio: "With a PhD in Computer Vision, Dr. Ananya spearheads the research and implementation of our real-time smart AR trying-on pipelines.",
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80"
      },
      {
        name: "Rahul Verma",
        role: "VP of Product Development",
        category: "core",
        bio: "Veteran software architect with 10+ years of building large-scale retail platforms and hardware-software IoT integrations.",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80"
      },
      {
        name: "Lisa Chang",
        role: "Principal UI/UX Design Architect",
        category: "core",
        bio: "Passionate about spatial computing. Lisa designs the immersive interfaces used in our public Smart AR Display kiosks.",
        imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80"
      },
      {
        name: "Robert Henderson",
        role: "Retail Tech & Strategic Advisor",
        category: "advisor",
        bio: "Former executive at leading global retail chains, advising TrialShopy on commercial expansion and brand integration strategies.",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80"
      }
    ];
    await TeamMember.insertMany(team);
    console.log("✅ Seeded 5 team members successfully.");
  }
};

const seedCareers = async () => {
  const careerCount = await Career.countDocuments();
  if (careerCount === 0) {
    const careers = [
      {
        title: "Senior computer vision engineer (AR)",
        department: "Engineering / AI Research",
        location: "Bengaluru, India (Hybrid)",
        description: "We are seeking a Computer Vision expert experienced in real-time body tracking, clothing segmentation, and 3D overlay rendering to optimize our Smart AR display engine.",
        requirements: [
          "3+ years experience with OpenCV, PyTorch, or TensorFlow.",
          "Solid background in 3D computer graphics and OpenGL/WebGL.",
          "Familiarity with WebRTC and real-time video streaming pipelines.",
          "Strong communication and collaborative skills."
        ]
      },
      {
        title: "Full-Stack Node.js Engineer",
        department: "Engineering / Backend",
        location: "Delhi NCR, India (On-site)",
        description: "Join our core platform team to build secure, scalable APIs, handle real-time inventory management, and manage database sync with IoT smart displays.",
        requirements: [
          "Proficiency in Node.js, Express, and MongoDB.",
          "Experience with Redis caching and WebSocket architectures.",
          "Familiarity with AWS services and Docker containerization.",
          "Strong understanding of RESTful API design and JWT authentication."
        ]
      },
      {
        title: "Lead UI/UX Designer (Spatial/AR)",
        department: "Product Design",
        location: "Remote",
        description: "We are looking for a designer to define the UX guidelines for interactive display kiosks. You will design voice, touch, and gesture-driven user interfaces.",
        requirements: [
          "Portfolio showing UI design for AR/VR applications or interactive hardware kiosks.",
          "Advanced proficiency with Figma and 3D modeling tools (Blender, Spline).",
          "Understanding of human-computer interaction (HCI) principles for public spaces.",
          "Ability to build interactive prototypes."
        ]
      },
      {
        title: "Growth Marketing Manager",
        department: "Marketing & Growth",
        location: "Mumbai, India (Hybrid)",
        description: "Drive adoption and strategic partnerships with retail stores, fashion brands, and colleges to place TrialShopy AR displays in premium locations.",
        requirements: [
          "2+ years experience in B2B marketing, growth hacking, or retail sales.",
          "Demonstrated success in managing omnichannel marketing campaigns.",
          "Excellent negotiation, networking, and presentation skills.",
          "Data-driven mindset with analytical capabilities."
        ]
      }
    ];
    await Career.insertMany(careers);
    console.log("✅ Seeded 4 career positions successfully.");
  }
};

const seedTestimonials = async () => {
  const testimonialCount = await Testimonial.countDocuments();
  if (testimonialCount === 0) {
    const testimonials = [
      {
        name: "Meera Deshmukh",
        role: "College Student, DU",
        message: "TrialShopy's AR Display inside our campus is incredible! Trying on dresses before purchasing takes literally 10 seconds. The discounts are amazing.",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80"
      },
      {
        name: "Vikram Malhotra",
        role: "Store Manager, FashionHub",
        message: "Since we installed the TrialShopy smart screen, foot traffic has doubled and customer engagement is at an all-time high. It has revolutionized our store front.",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80"
      },
      {
        name: "Siddharth Roy",
        role: "Software Professional",
        message: "No long queues in front of fitting rooms anymore. Just stand, scan, visualize, and order. High-speed delivery makes it even better!",
        rating: 4,
        imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&h=200&q=80"
      }
    ];
    await Testimonial.insertMany(testimonials);
    console.log("✅ Seeded 3 testimonials successfully.");
  }
};

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`📡 MongoDB Connected: ${conn.connection.host}`);
    
    // Seed datasets
    await seedAdmin();
    await seedStats();
    await seedProducts();
    await seedTeamMembers();
    await seedCareers();
    await seedTestimonials();
    
    console.log('🎉 Database seeding checks completed.');
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};
