from BoardInstance import BoardInstance
from search import a_star


def to_flat_list(nested_list: list[list[int]]) -> list[int]:
    """Return a Jagia-style list for 2-D `nested_list`"""
    flat_list = sum(nested_list, [])
    flat_list = [i if i else len(flat_list) for i in flat_list]
    return flat_list


def to_nested_list(flat_list: list[int]) -> list[list[int]]:
    """Return a 2-D list for Jagia-style list"""
    edge_length = int(len(flat_list) ** 0.5)
    nested_list = []
    for i in range(edge_length):
        row_start = i * edge_length
        row = flat_list[row_start: row_start + edge_length]
        row = [x if x < len(flat_list) else None for x in row]
        nested_list.append(row)
    return nested_list


def generate_states(N: int) -> tuple[list, list]:
    """Returns (initial state, goal state) as Jagia-style flat lists"""
    seed = 125

    N = N**2 - 1

    goal = BoardInstance.random(N)
    initial = goal.drunk_walk(seed)

    goal_list = to_flat_list(goal.matrix)
    initial_list = to_flat_list(initial.matrix)

    return (initial_list, goal_list)


def heuristic(current_list: list[int], goal_list: list[int]) -> int:
    current = BoardInstance(to_nested_list(current_list))
    goal = BoardInstance(to_nested_list(goal_list))
    return current.manhattan_distance(goal)


def next_state(current: list[int], goal: list[int]) -> tuple[list[int], int]: 
    """Returns the next state in the optimal path current -> next -> ... -> goal.
    Inputs are Jagia-style flat lists.
    """
    current = BoardInstance(to_nested_list(current))
    goal = BoardInstance(to_nested_list(goal))

    try:
        next = a_star(current, goal)[1]
    except:
        next = goal # if there's no next, you're at the goal state

    return (to_flat_list(next.matrix), next.manhattan_distance(goal))



if __name__ == "__main__":
    initial_list, goal_list = generate_states(3)
    print(initial_list, goal_list)

    goal_2d = to_nested_list(initial_list)
    initial_2d = to_nested_list(goal_list)
    
    print(initial_2d, goal_2d)
    for b in a_star(BoardInstance(initial_2d), BoardInstance(goal_2d)):
        print(b)

    print(next_state(initial_list, goal_list))
    print(heuristic(initial_list, goal_list))