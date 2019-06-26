from threading import Thread


class Observer:

    def __init__(self):
        self.subscribers = set()

    def register(self, component):
        self.subscribers.add(component)

    def unregister(self, component):
        self.subscribers.discard(component)

    def dispatch(self, change):
        import time
        t0 = time.time()
        t_list = list()
        for subscriber in self.subscribers:
            t = Thread(target=subscriber.update, args=(change,))
            t_list.append(t)
            t.start()

        for t in t_list:
            t.join()

        t1 = time.time()
        total = t1 - t0
        print("baum gebaut in " + str(total))
