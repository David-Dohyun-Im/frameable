/**
 * Simple request throttling to prevent rate limit issues
 */

class RequestThrottle {
  private lastRequestTime = 0;
  private readonly MIN_INTERVAL = 2000; // 2초 간격

  async throttle(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.MIN_INTERVAL) {
      const waitTime = this.MIN_INTERVAL - timeSinceLastRequest;
      console.log(`Throttling: waiting ${waitTime}ms before next request`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastRequestTime = Date.now();
  }
}

export const requestThrottle = new RequestThrottle();
