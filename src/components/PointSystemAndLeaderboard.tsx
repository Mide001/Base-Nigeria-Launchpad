"use client";
import React, { useState, useEffect } from "react";
import { Trophy, Award, Star, Users, Zap, PlusCircle, ArrowRight, Gift, Flame } from "lucide-react";
import { motion } from "framer-motion";

// Sample data for the leaderboard with .base.eth domains
const topContributors = [
  {
    name: "adesina.base.eth",
    points: 780,
    avatar: "/placeholder/avatar1.jpg",
    contributions: ["Built 2 dApps", "Hosted 3 Spaces"],
  },
  {
    name: "chiamaka.base.eth",
    points: 650,
    avatar: "/placeholder/avatar2.jpg",
    contributions: ["Created 5 Videos", "Organized Meetup"],
  },
  {
    name: "oluwaseun.base.eth",
    points: 520,
    avatar: "/placeholder/avatar3.jpg",
    contributions: ["Technical Threads", "Code Reviews"],
  },
  {
    name: "temitope.base.eth",
    points: 480,
    avatar: "/placeholder/avatar4.jpg",
    contributions: ["Improved Base SDK", "Documentation"],
  },
  {
    name: "kola.base.eth",
    points: 430,
    avatar: "/placeholder/avatar5.jpg",
    contributions: ["Hosted Workshops", "Content Creation"],
  },
];

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  opacity: [0.8, 1, 0.8],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const PointSystemAndLeaderboard = () => {
  // For animated counter effect
  const [isInView, setIsInView] = useState(false);

  // Point system details
  const pointCategories = [
    {
      category: "Building Apps on Base",
      points: "100-500",
      description: "Full dApps, smart contracts, or tools built on Base",
      icon: <Zap className="w-5 h-5" />,
      color: "bg-gradient-to-r from-yellow-400 to-amber-500",
      iconBg: "bg-yellow-400/20",
    },
    {
      category: "Organizing IRL Events",
      points: "75-200",
      description: "Meetups, hackathons, conferences, and workshops",
      icon: <Users className="w-5 h-5" />,
      color: "bg-gradient-to-r from-blue-400 to-indigo-500",
      iconBg: "bg-blue-400/20",
    },
    {
      category: "Creating Video Content",
      points: "50-150",
      description: "Tutorials, explainers, and promotional content",
      icon: <PlusCircle className="w-5 h-5" />,
      color: "bg-gradient-to-r from-red-400 to-pink-500",
      iconBg: "bg-red-400/20",
    },
    {
      category: "Modifying/Improving Builds",
      points: "40-120",
      description: "Significant improvements to existing projects",
      icon: <Flame className="w-5 h-5" />,
      color: "bg-gradient-to-r from-purple-400 to-violet-500",
      iconBg: "bg-purple-400/20",
    },
    {
      category: "Hosting Twitter Spaces",
      points: "30-80",
      description: "Educational discussions about Base ecosystem",
      icon: <Users className="w-5 h-5" />,
      color: "bg-gradient-to-r from-green-400 to-emerald-500",
      iconBg: "bg-green-400/20",
    },
    {
      category: "Writing Technical Threads",
      points: "20-50",
      description: "Educational content explaining Base features",
      icon: <PlusCircle className="w-5 h-5" />,
      color: "bg-gradient-to-r from-teal-400 to-cyan-500",
      iconBg: "bg-teal-400/20",
    },
    {
      category: "General Content Creation",
      points: "10-30",
      description: "Blog posts, tweets, and other promotional content",
      icon: <Zap className="w-5 h-5" />,
      color: "bg-gradient-to-r from-indigo-400 to-blue-500",
      iconBg: "bg-indigo-400/20",
    },
  ];

  useEffect(() => {
    // Set animation trigger when component mounts
    const timer = setTimeout(() => setIsInView(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Animated counter component
  const Counter = ({
    value,
    duration = 2000,
  }: {
    value: string;
    duration?: number;
  }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (isInView) {
        let start = 0;
        const end = parseInt(value);
        const incrementTime = duration / end;
        let timer: NodeJS.Timeout | undefined;

        const updateCount = () => {
          start += 1;
          setCount(start);
          if (start < end) {
            timer = setTimeout(updateCount, incrementTime);
          }
        };

        timer = setTimeout(updateCount, incrementTime);
        return () => {
          if (timer) clearTimeout(timer);
        };
      }
    }, [value, duration, isInView]);

    return <span>{count}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white py-16 relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={pulseAnimation}
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl"
        ></motion.div>
        <motion.div 
          animate={pulseAnimation}
          className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl"
        ></motion.div>
        <motion.div 
          animate={pulseAnimation}
          className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-emerald-600/10 blur-3xl"
        ></motion.div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Base Nigeria Point System
            </h1>
            <motion.div 
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full mx-auto mt-1"
            ></motion.div>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mt-8 leading-relaxed"
          >
            Recognizing and rewarding contributions to the Base ecosystem in
            Nigeria. Points are awarded based on the effort and impact of your
            contributions.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Points Breakdown with animations */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-xl relative overflow-hidden"
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl opacity-70"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl opacity-70"></div>

            <motion.div 
              className="flex items-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="mr-4 p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl backdrop-blur-md">
                <Award className="w-8 h-8 text-emerald-300" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                Points Breakdown
              </h3>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-5 relative z-10"
            >
              {pointCategories.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start border-b border-gray-700/30 pb-4 hover:bg-gray-800/30 p-3 rounded-xl transition-all duration-300"
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(45, 55, 72, 0.5)",
                  }}
                >
                  <div className={`${item.color} rounded-xl p-3 mr-4 flex-shrink-0 shadow-lg border border-white/10`}>
                    <span className="font-bold text-white text-lg flex items-center gap-2">
                      {item.points}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white flex items-center gap-2 text-lg">
                      <span className={`p-1.5 rounded-lg ${item.iconBg}`}>
                        {item.icon}
                      </span>
                      {item.category}
                    </h4>
                    <p className="text-gray-300 mt-1 opacity-80">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Leaderboard with animations */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-xl relative overflow-hidden"
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl opacity-70"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-2xl opacity-70"></div>

            <motion.div 
              className="flex items-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="mr-4 p-3 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-xl backdrop-blur-md">
                <Trophy className="w-8 h-8 text-yellow-300" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">
                Top Contributors
              </h3>
            </motion.div>

            <div className="flex justify-between text-gray-400 mb-4 px-3 text-sm font-medium uppercase tracking-wider">
              <span>Contributor</span>
              <span className="mr-4">Points</span>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4 relative z-10"
            >
              {topContributors.map((contributor, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center border-b border-gray-700/30 pb-4 hover:bg-gray-800/30 p-3 rounded-xl transition-all duration-300"
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(45, 55, 72, 0.5)",
                  }}
                >
                  <div className="relative mr-4 flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-gray-800 overflow-hidden border-2 border-gray-700 shadow-lg group-hover:border-emerald-500 transition-all duration-300">
                      <img
                        src={`/api/placeholder/64/64`}
                        alt={contributor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {index < 3 && (
                      <div
                        className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                          index === 0
                            ? "bg-gradient-to-br from-yellow-400 to-yellow-600 ring-2 ring-yellow-300/50"
                            : index === 1
                            ? "bg-gradient-to-br from-gray-300 to-gray-500 ring-2 ring-gray-300/50"
                            : "bg-gradient-to-br from-amber-600 to-amber-800 ring-2 ring-amber-500/50"
                        }`}
                      >
                        <span className="text-xs font-bold">{index + 1}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium text-white flex items-center text-lg">
                      {contributor.name}
                      {index === 0 && (
                        <motion.div
                          animate={{ rotate: [0, 10, 0, -10, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "easeInOut",
                          }}
                        >
                          <Star className="w-5 h-5 ml-2 text-yellow-400 fill-yellow-400" />
                        </motion.div>
                      )}
                    </h4>
                    <p className="text-xs text-gray-300 opacity-80 mt-1">
                      {contributor.contributions.join(" • ")}
                    </p>
                  </div>
                  <div className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-xl text-emerald-300 font-bold ml-2 border border-emerald-500/30 shadow-lg">
                    {isInView ? (
                      <Counter value={contributor.points.toString()} />
                    ) : (
                      0
                    )}{" "}
                    pts
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="mt-8 text-center"
            >
              <motion.a
                href="/leaderboard"
                className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-6 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                View Full Leaderboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {[
            { 
              label: "Active Contributors", 
              value: "138",
              icon: <Users className="w-6 h-6" />,
              color: "from-blue-400 to-indigo-500",
              bgColor: "from-blue-500/10 to-indigo-500/10"
            },
            { 
              label: "Projects Built", 
              value: "42",
              icon: <Zap className="w-6 h-6" />,
              color: "from-yellow-400 to-amber-500",
              bgColor: "from-yellow-500/10 to-amber-500/10"
            },
            { 
              label: "Events Organized", 
              value: "23",
              icon: <Users className="w-6 h-6" />,
              color: "from-purple-400 to-violet-500",
              bgColor: "from-purple-500/10 to-violet-500/10"
            },
            { 
              label: "Total Points Awarded", 
              value: "4,879",
              icon: <Award className="w-6 h-6" />,
              color: "from-emerald-400 to-teal-500",
              bgColor: "from-emerald-500/10 to-teal-500/10"
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.03 }}
              className={`bg-gradient-to-br ${stat.bgColor} backdrop-blur-md rounded-2xl p-6 text-center border border-gray-700/30 shadow-xl relative overflow-hidden group`}
            >
              <motion.div 
                animate={floatingAnimation}
                className={`flex justify-center items-center w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r ${stat.color} text-white`}
              >
                {stat.icon}
              </motion.div>
              <h3 className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {isInView ? (
                  <Counter value={stat.value.replace(/,/g, "")} />
                ) : (
                  0
                )}
                {stat.value.includes(",") ? "," : ""}
              </h3>
              <p className="text-gray-300 opacity-90 font-medium">{stat.label}</p>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* How Points Work Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-md rounded-2xl p-10 border border-gray-700/50 shadow-xl mb-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')] bg-center"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl opacity-70"></div>

          <motion.div 
            className="flex items-center mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="mr-4 p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl backdrop-blur-md">
              <Gift className="w-8 h-8 text-cyan-300" />
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              How Our Point System Works
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {[
              {
                title: "Earn",
                description:
                  "Contribute to the Base ecosystem through development, content creation, or community organization.",
                icon: <Zap className="w-10 h-10 text-white" />,
                color: "from-yellow-400 to-amber-500",
                bgGradient: "from-yellow-400/10 to-amber-500/10"
              },
              {
                title: "Track",
                description:
                  "All contributions are verified and recorded on-chain, with points allocated based on impact and effort.",
                icon: <Award className="w-10 h-10 text-white" />,
                color: "from-blue-400 to-indigo-500",
                bgGradient: "from-blue-400/10 to-indigo-500/10"
              },
              {
                title: "Benefit",
                description:
                  "Top contributors receive recognition, exclusive access, and opportunities within the ecosystem.",
                icon: <Trophy className="w-10 h-10 text-white" />,
                color: "from-emerald-400 to-teal-500",
                bgGradient: "from-emerald-400/10 to-teal-500/10"
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${item.bgGradient} backdrop-blur-md border border-gray-700/30 shadow-lg group relative overflow-hidden`}
              >
                <motion.div 
                  animate={floatingAnimation}
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-6 mx-auto shadow-lg border border-white/10`}
                >
                  {item.icon}
                </motion.div>
                <h4 className={`text-2xl font-bold text-center mb-4 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                  {item.title}
                </h4>
                <p className="text-gray-300 text-center opacity-90">{item.description}</p>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PointSystemAndLeaderboard;