a = ([1, 2, 3], [4, 5, 6], [7, 8, 9])
enqueue = [10, 11, 12]

def enqueue_func(queue, element):
    if isinstance(queue, tuple):
        queue = list(queue)
    queue.append(element)
    return queue
