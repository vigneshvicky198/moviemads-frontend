import React from 'react'
import { Helmet } from 'react-helmet'

const Keywords = () => {



const keywords = [
  'Movie', 'Movie tickets', 'Movie reviews', 'Movie trailers', 'Movie events',
  'Movie promotions', 'Most popular movie', 'Movie ratings', 'Newest movie',
  'Latest movie', 'Movie release', 'Greatest movie', 'Blockbuster movie',
  'Movie2024', 'Online movie tickets', 'Films', 'Best movies', 'New movie',
  'Movies download', 'Movie site', 'Film show', 'Movie theaters', 'Movie tickets booking',
  'Movie trailers 2024', 'Movie trailer spot', 'Movies free', 'Movie series', 'Online movies',
  'Movie viewers', 'Film series', 'Movie release date', 'Streaming movies', 'Film awards',
  'Award winning movie', 'Movie awards', 'Movie awards 2024', 'Movie awards lists',
  'Most popular movie awards', 'Best movie awards', 'Movie awards winners', 'Awards 2024',
  'Awards winning films', 'Latest movie awards', 'Film festival', 'Movie awards events',
  'Short film', 'Best short films', 'Short film trailers', 'Short film reviews', 'Short film 2024',
  'Newest short film', 'Best short film awards', 'Short film awards 2024', 'Short film award winning',
  'Film awards 2024', 'Movie events', 'Movie events 2024', 'Movie events today', 'Best movie events',
  'movie events cinema', 'New movies events', 'Tamil movie events', 'Movie events in Chennai',
  'Tamil new movies', 'Tamil new movie online', 'New movie trailer', 'Film 2024', 'Tamil movie awards',
  'Feature film', 'Film production', 'Popular feature film', 'New movie release', 'Film industry',
  'Movie awards Chennai', 'Best film', 'Best film awards', 'Film entertainments', 'Entertainment 2024',
  'Movie awards winning', 'Short film contest', 'New Tamil film', 'Tamil movies online', 'Tamil movie 2024',
  'Movie downloads', 'Movie posters', 'Movie tickets online', 'Movie tickets', 'Short film contest 2024',
  'Short film contest winner', 'Short film award winner', 'Short film awards 2024', 'Latest short film awards',
  'Short film Chennai', 'Tamil movie awards 2024', 'Tamil movie award winner', 'Short film Tamil', 'Short film video',
  'Short film idea', 'Latest short film', 'New short film', 'New Tamil short film', 'Film entertainments videos',
  'Film entertainment 2024', 'Film entertainment Tamil', 'Entertainment', 'Movie entertainment 2024',
  'Entertainment world 2024', 'Entertainment Chennai', 'Entertainment times', 'Tamil film awards', 'Film awards show',
  'Film awards show 2024', 'Film awards show live', 'New movie trailers', 'Movie clips', 'Latest movie Tamil',
  'New movie Tamil 2024', 'New release movie', 'Latest movie trailers', 'Trailers', 'Short film release date',
  'New movies Tamil', 'Movie trailers and reviews', 'Latest movie news', 'Movie news', 'Short film viewers',
  'Online movie tickets booking', 'Book movie tickets', 'Cinema movies', 'Online HD movies', 'Free movies',
  'Short film competition', 'HD movies', 'Movies website', 'Latest film reviews', 'Online movies streaming site',
  'Latest movie clips', 'Film festivals', 'Screenplay competitions'
];
    

  return (
    <>
    <Helmet>
        <title>Moviemads keywords page</title>
        <meta name="description" content="Discover the latest movie trailers, and reviews from the world's top-rated Films." />
        <meta name="keywords" content={keywords.join(', ')} />
    </Helmet>
    <div>
      {keywords.map((keyword, index) => (
        <a
          key={index}
          href={`https://www.moviemads.com/`}
          className="keyword-link"
          style={{ margin: '5px', display: 'inline-block' }}
        >
          {keyword}
        </a>
      ))}
    </div>
    </>
  )
}

export default Keywords