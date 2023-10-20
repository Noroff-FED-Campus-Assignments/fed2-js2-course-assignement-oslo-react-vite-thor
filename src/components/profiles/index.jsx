import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ExampleProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followedProfiles, setFollowedProfiles] = useState({});

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);

        const accessToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODEsIm5hbWUiOiJmcm9kbG8iLCJlbWFpbCI6ImZpcnN0Lmxhc3RAc3R1ZC5ub3JvZmYubm8iLCJhdmF0YXIiOm51bGwsImJhbm5lciI6bnVsbCwiaWF0IjoxNjk2NDExMTMyfQ.5rZZV8ic8pB0zNR_fLzZyHmOgteJA4HE5AbB4iPvNNE";

        const url = new URL(`https://api.noroff.dev/api/v1/social/profiles`);

        url.searchParams.append("_author", "true");

        url.searchParams.append("_comments", "true");

        url.searchParams.append("_reactions", "true");

        const response = await fetch(url.href, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();

        // Generate and set random avatar images for profiles

        const updatedProfiles = data.map((profile) => ({
          ...profile,

          avatar: getRandomAvatarImage(profile.id),
        }));

        setProfiles(updatedProfiles);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  // Function to generate a random avatar image URL for a specific profile ID

  const getRandomAvatarImage = (profileId) => {
    const randomImageId = Math.floor(Math.random() * 1000);

    return `https://source.unsplash.com/random/100x100/?avatar?sig=${randomImageId}&profileId=${profileId}`;
  };

  const toggleFollow = (profileName) => {
    setFollowedProfiles((prevState) => ({
      ...prevState,
      [profileName]: !prevState[profileName],
    }));
  };

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Something went wrong! {error?.message}</h1>;

  return (
    <>
      <section id="hero-home">{/* Possibly some hero content here */}</section>

      <section id="feed" className="w-full bg-base-100">
        <div className="min-h-screen md:container md:mx-auto flex sm:flex-col flex-wrap content-center justify-center overflow-x-hidden">
          {profiles.map((profile) => (
            <div
              key={profile?.name}
              className="w-full md:w-2/3 p-2 mb-2.5 sm:w-10/12 flex content-center justify-center"
            >
              <div className="card w-2/3 h-auto md:w-4/5 glass">
                <div className="flex flex-row py-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full mx-5">
                      <img
                        className="object-cover w-full h-full"
                        src={profile?.avatar}
                        alt={profile?.name}
                      />
                    </div>
                  </div>
                  <p className="flex-end text-sm capitalize pr-2 py-4">
                    <Link
                      to={`/profiles/${profile.name}?profileid=${profile.name}`}
                    >
                      {profile?.name}
                    </Link>
                  </p>
                </div>
                <div className="card-body prose">
                  <div className="flex flex-col sm:flex-row items-center justify-between">
                    <p className="text-start flex-grow mb-2 sm:mb-0">
                      {profile?.email}
                    </p>
                    <button
                      onClick={() => toggleFollow(profile.name)}
                      className={`mt-2 px-4 py-2 rounded ${
                        followedProfiles[profile.name]
                          ? "bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    >
                      {followedProfiles[profile.name] ? "Unfollow" : "Follow"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
