import React from 'react';
import { Users, Target, Award, Heart } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Quality First',
      description: 'We never compromise on the quality of fruits we source and deliver.'
    },
    {
      icon: Users,
      title: 'Farmer Partnership',
      description: 'Building lasting relationships with farmers for mutual growth and success.'
    },
    {
      icon: Target,
      title: 'Global Reach',
      description: 'Connecting local farms to international markets seamlessly.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering excellence in every aspect of our service.'
    }
  ];

  const timeline = [
    {
      year: '2018',
      title: 'Company Founded',
      description: 'Started with a vision to connect farmers directly to global markets.'
    },
    {
      year: '2019',
      title: 'First International Export',
      description: 'Expanded operations to serve customers in 10 countries.'
    },
    {
      year: '2021',
      title: 'Digital Platform Launch',
      description: 'Launched our comprehensive online marketplace platform.'
    },
    {
      year: '2023',
      title: 'Sustainability Initiative',
      description: 'Introduced eco-friendly packaging and carbon-neutral shipping.'
    },
    {
      year: '2024',
      title: 'Global Recognition',
      description: 'Achieved industry leadership with 50+ countries and 10,000+ customers.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About <span className="text-green-600">BK Fruits</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                BK Fruits is a leading fruit supply company dedicated to connecting farmers 
                with global markets while ensuring the highest quality standards and 
                sustainable practices.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded in 2018, BK Fruits has grown from a small local operation 
                to a global platform serving over 10,000 customers across 50+ countries.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="About BK Fruits"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-green-50 p-8 rounded-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To revolutionize the fruit supply chain by creating direct connections 
                between farmers and consumers, ensuring fair prices for farmers and 
                fresh, quality produce for customers worldwide.
              </p>
            </div>
            <div className="bg-orange-50 p-8 rounded-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To become the world's most trusted fruit marketplace, empowering farmers 
                with technology and providing consumers with traceable, sustainable, 
                and premium quality fruits from around the globe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These values guide everything we do and shape our relationships with farmers, customers, and partners.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              From humble beginnings to global leadership
            </p>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-green-200 transform md:-translate-x-0.5"></div>
            
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-green-600 rounded-full transform md:-translate-x-2 z-10"></div>
                
                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Meet Our BK Fruits Leadership Team
          </h2>
          <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto">
            Passionate leaders driving innovation in agricultural technology and sustainable farming practices.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'CEO & Founder',
                image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300'
              },
              {
                name: 'Michael Chen',
                role: 'CTO',
                image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300'
              },
              {
                name: 'Emma Rodriguez',
                role: 'Head of Operations',
                image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300'
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-green-100">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;