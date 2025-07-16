const API_URL = 'http://localhost:5000/api';

const courseService = {
  async getCourses(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (filters.category && filters.category !== 'All') {
        queryParams.append('category', filters.category);
      }
      if (filters.level && filters.level !== 'All Levels') {
        queryParams.append('level', filters.level);
      }
      if (filters.search) {
        queryParams.append('search', filters.search);
      }
      if (filters.sortBy) {
        queryParams.append('sortBy', filters.sortBy === 'newest' ? 'createdAt' : filters.sortBy);
        queryParams.append('sortOrder', 'desc');
      }

      const response = await fetch(`${API_URL}/courses?${queryParams}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message);
      }

      return {
        success: true,
        data: data.data.courses
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch courses'
      };
    }
  },

  async getCourseById(id) {
    try {
      const response = await fetch(`${API_URL}/courses/${id}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      const course = data.data.course;
      // If there are videos, use the first video's URL as the main video URL
      if (course.videos && course.videos.length > 0) {
        course.videoUrl = course.videos[0].url;
      } else if (course.previewVideo) {
        course.videoUrl = course.previewVideo;
      }

      return {
        success: true,
        data: course
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch course'
      };
    }
  }
};

export default courseService;