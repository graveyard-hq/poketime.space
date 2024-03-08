import videoService from './video.service';

class VideoController {
    private readonly videoService: typeof videoService;

    constructor() {
        this.videoService = videoService;
    }
}

const videoController = new VideoController();

export default videoController;
