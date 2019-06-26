from threading import Thread


class Observer:

    def __init__(self):
        self.subscribers = set()

    def register(self, component):
        self.subscribers.add(component)

    def unregister(self, component):
        self.subscribers.discard(component)

    def dispatch(self, change):
        t_list = list()
        for subscriber in self.subscribers:
            t = Thread(target=subscriber.update, args=(change,))
            t_list.append(t)
            t.start()

        for t in t_list:
            t.join()

