import videoRepository from './video.repository';

class VideoService {
    private readonly videoRepository: typeof videoRepository;

    constructor() {
        this.videoRepository = videoRepository;
    }
}

const videoService = new VideoService();

export default videoService;
