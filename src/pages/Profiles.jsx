/**
 * Displays a list of profiles
 * @see https://docs.noroff.dev/social-endpoints/profiles
 */
import Navigation from "../components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExampleProfiles from "../components/profiles";

export default function ProfilesPage() {
  return (
    <>
      <Navigation />
      <Router>
        <Routes>
          <Route path="/profiles" element={<ExampleProfiles />} />
        </Routes>
      </Router>
    </>
  );
}
