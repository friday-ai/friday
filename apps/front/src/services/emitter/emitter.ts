type Listener = (args: unknown) => void;

class Emitter {
  private eventHandlers: Record<string, Listener[]> = {};

  addListener(event: string, handler: Listener) {
    if (!event || !handler) return false;

    if (typeof handler !== 'function') return false;

    // Check if this event not exists
    if (this.eventHandlers[event] === undefined) {
      this.eventHandlers[event] = [];
    }

    this.eventHandlers[event].push(handler);

    return true;
  }

  emit(event: string, data: unknown) {
    // Check if this event not exists
    if (this.eventHandlers[event] === undefined) {
      return false;
    }

    this.eventHandlers[event].forEach((listener) => {
      listener(data);
    });

    return true;
  }

  removeListener(event: string, callback: Listener) {
    // Check if this event not exists
    if (this.eventHandlers[event] === undefined) {
      return false;
    }

    this.eventHandlers[event] = this.eventHandlers[event].filter((listener) => listener.toString() !== callback.toString());

    return true;
  }
}

export default Emitter;
