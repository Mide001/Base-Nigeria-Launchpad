import { Star, Globe, Gem, Target } from "lucide-react";

const Features = () => {
    const features = [
      {
        icon: <Star className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 transition-transform group-hover:scale-110 duration-300" />,
        title: "Community-Driven Innovation",
        description: "Powered by builders, for builders"
      },
      {
        icon: <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-green-400 transition-transform group-hover:scale-110 duration-300" />,
        title: "Pan-African Impact",
        description: "Building solutions for local challenges"
      },
      {
        icon: <Gem className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400 transition-transform group-hover:scale-110 duration-300" />,
        title: "Quality Solutions",
        description: "Community-reviewed implementations"
      },
      {
        icon: <Target className="w-8 h-8 sm:w-10 sm:h-10 text-orange-400 transition-transform group-hover:scale-110 duration-300" />,
        title: "Problem-First Approach",
        description: "Focus on real-world application"
      }
    ];
  
    return (
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 sm:space-x-4 group opacity-0 animate-fade-in-up animate-delay-${index + 1}`}
            >
              <div className="p-2 sm:p-3 bg-gray-900/50 rounded-lg transition-colors duration-300 group-hover:bg-gray-900/80">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-emerald-300 group-hover:text-emerald-200 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Features;