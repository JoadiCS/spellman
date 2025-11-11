import NavigationBar from '../components/home/NavigationBar.jsx';
import HeroSection from '../components/home/HeroSection.jsx';
import ImpactSection from '../components/home/ImpactSection.jsx';
import ProjectsSection from '../components/home/ProjectsSection.jsx';
import GoalsSection from '../components/home/GoalsSection.jsx';
import JoinSection from '../components/home/JoinSection.jsx';
import FooterSection from '../components/home/FooterSection.jsx';

const Home = () => (
  <div className="min-h-screen bg-neutral-900 text-neutral-900">
    <NavigationBar />
    <main className="space-y-0">
      <HeroSection />
      <ImpactSection />
      <ProjectsSection />
      <GoalsSection />
      <JoinSection />
    </main>
    <FooterSection />
  </div>
);

export default Home;
