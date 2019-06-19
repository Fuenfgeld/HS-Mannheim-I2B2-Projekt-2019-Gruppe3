from threading import Thread


class Observer:

    def __init__(self):
        self.subscribers = set()

    def register(self, component):
        self.subscribers.add(component)

    def unregister(self, component):
        self.subscribers.discard(component)

    def dispatch(self, change):
        threads = list()
        for subscriber in self.subscribers:
            t = Thread(target=subscriber.update, args=(change,))
            threads.append(t)
            t.start()

        for t in threads:
            t.join()


