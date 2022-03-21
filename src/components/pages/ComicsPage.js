import {Helmet} from 'react-helmet';

import ComicsList from '../comicsList/ComicsList'
import AppBanner from '../appBanner/AppBanner'

const ComicsPage = () => {
   return (
      <>
      <Helmet>
         <title>Comics page</title>
         <meta name="description" content="Page with list of our comics" />
      </Helmet>
       <AppBanner/>
       <ComicsList/>
      </>
   )
}


export default ComicsPage