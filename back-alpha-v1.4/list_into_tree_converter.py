from tree_node import TreeNode


def list_into_tree_node(data_list):
    stack = list()
    parent = TreeNode(data_list.pop(0))
    stack.append(parent)
    while data_list:
        parent = stack.pop()
        child = TreeNode(data_list.pop(0))
        look_for_position(stack, parent, child)
        stack.append(child)

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
    if len(stack) >= 1:
        parent = stack.pop()
        parent.add_child(child)
        stack.append(parent)
    else:
        print("ERROR1")


def add_to_grandparent(stack):
    if len(stack) >= 2:
        parent = stack.pop()
        grand_parent = stack.pop()
        grand_parent.add_child(parent)
        stack.append(grand_parent)
    else:
        print("ERROR2")
