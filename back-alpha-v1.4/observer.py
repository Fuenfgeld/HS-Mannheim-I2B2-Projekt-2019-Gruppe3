class Observer:

    def __init__(self):
        self.subscribers = set()

    def register(self, component):
        self.subscribers.add(component)

    def unregister(self, component):
        self.subscribers.discard(component)

    def dispatch(self, change):
        for subscriber in self.subscribers:
            subscriber.update(change)
