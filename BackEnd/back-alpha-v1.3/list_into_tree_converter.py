from tree_node import TreeStructure


def list_into_tree_node(data_list):
    parent = TreeStructure(data_list.pop(0))
    stack = []
    while data_list:
        child = TreeStructure(data_list.pop(0))
        look_for_position(stack, parent, child)
        parent = child

    for i in range(1, len(stack)):
        add_to_grandparent(stack)
    if stack:
        parent = stack.pop()
    return parent


def look_for_position(stack, parent, child):
    if parent.h_lvl < child.h_lvl:
        have_children(stack, parent)

    elif parent.h_lvl == child.h_lvl:
        add_to_parent(stack, parent)

    elif parent.h_lvl > child.h_lvl:
        diff = parent.h_lvl - child.h_lvl
        add_to_parent(stack, parent)
        for i in range(0, diff):
            add_to_grandparent(stack)


def have_children(stack, parent):
    stack.append(parent)


def add_to_parent(stack, child):
    parent = stack.pop()
    parent.add_child(child)
    stack.append(parent)


def add_to_grandparent(stack):
    parent = stack.pop()
    grand_parent = stack.pop()
    grand_parent.add_child(parent)
    stack.append(grand_parent)
