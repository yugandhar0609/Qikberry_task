import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhotos, setCurrentPage } from '../../redux/slices/photosSlice';

const Photos = () => {
  const dispatch = useDispatch();
  const { 
    items: photos, 
    status, 
    error, 
    currentPage, 
    itemsPerPage 
  } = useSelector(state => state.photos);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPhotos());
    }
  }, [status, dispatch]);

  const displayedPhotos = useMemo(() => {
    const indexOfLastPhoto = currentPage * itemsPerPage;
    const indexOfFirstPhoto = indexOfLastPhoto - itemsPerPage;
    return photos.slice(indexOfFirstPhoto, indexOfLastPhoto);
  }, [photos, currentPage, itemsPerPage]);

  const paginate = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-4">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Photos Gallery</h2>
        <div className="text-sm text-gray-600">
          Showing {displayedPhotos.length} of {photos.length} photos
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedPhotos.map(photo => (
          <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative pb-[100%] bg-gray-100"> {/* Square aspect ratio container */}
              <img 
                src={photo.thumbnailUrl} 
                alt={photo.title}
                className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  Photo #{photo.id}
                </span>
                <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                  Album #{photo.albumId}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-3">{photo.title}</h3>
              <div className="flex items-center justify-between">
                <a 
                  href={photo.thumbnailUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Thumbnail
                </a>
                <a 
                  href={photo.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Full Image
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <div className="inline-flex items-center">
          <button 
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-l-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {Array.from({ length: Math.min(5, Math.ceil(photos.length / itemsPerPage)) }).map((_, index) => {
            const pageNumber = currentPage > 3 
              ? currentPage - 3 + index + (
                currentPage > Math.ceil(photos.length / itemsPerPage) - 2 
                  ? Math.ceil(photos.length / itemsPerPage) - currentPage - 2 
                  : 0
              )
              : index + 1;
            
            if (pageNumber > Math.ceil(photos.length / itemsPerPage)) return null;
            
            return (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`px-4 py-2 border-t border-b border-gray-300 text-sm font-medium ${
                  currentPage === pageNumber
                    ? 'bg-blue-50 text-blue-600 border-blue-500'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
          
          <button 
            onClick={() => currentPage < Math.ceil(photos.length / itemsPerPage) && paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(photos.length / itemsPerPage)}
            className="px-4 py-2 border border-gray-300 rounded-r-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Photos; 