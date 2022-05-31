class MyNode<K> {
    readonly _key: K
    private _left: MyNode<K> | null
    private _right: MyNode<K> | null

    public constructor(key: K) {
        this._key = key
        this._left = null
        this._right = null
    }

    public get key(): K {
        return this._key
    }

    public get left(): MyNode<K> | null {
        return this._left
    }

    public set left(leftSon: MyNode<K> | null) {
        this._left = leftSon
    }

    public get right(): MyNode<K> | null {
        return this._right
    }

    public set right(rightSon: MyNode<K> | null) {
        this._right = rightSon
    }
}

export class MyTree<K> {
    private _root: MyNode<K> | null
    private _size: number = 0

    public constructor() {
        this._root = null
    }

    public get root(): MyNode<K> | null {
        return this._root
    }

    public get size(): number {
        return this._size
    }

    public add(key: K) {
        ++this._size
        if (!this._root) { this._root = new MyNode<K>(key) }
        else {
            let tmpNode = this._root

            while (true) {
                if (tmpNode.key < key) {
                    if (tmpNode.right) { tmpNode = tmpNode.right }
                    else {
                        tmpNode.right = new MyNode<K>(key)
                        break
                    }
                }
                else {
                    if (tmpNode.left) { tmpNode = tmpNode.left }
                    else {
                        tmpNode.left = new MyNode<K>(key)
                        break
                    }
                }
            }
        }
    }

    public display(tmpNode: MyNode<K> | null) {
        if (!this._root) { process.stdout.write(`${"Empty!"}`) }

        else if (tmpNode) {
            this.display(tmpNode.left)
            process.stdout.write(`${tmpNode.key} `)
            this.display(tmpNode.right)
        }
    }

    public search(key: K): MyNode<K> | null {
        if (!this._root) { return null }

        let tmpNode = this._root

        while (tmpNode.key !== key) {
            if (tmpNode.key < key) {
                if (!tmpNode.right) { return null }
                tmpNode = tmpNode.right
            }
            else {
                if (!tmpNode.left) { return null }
                tmpNode = tmpNode.left
            }
        }
        return tmpNode
    }

    public delete(key: K): MyNode<K> | null {
        if (!this._root) { return null }

        let parent = null
        let tmpNode = this._root

        while (tmpNode.key !== key) {
            if (tmpNode.key < key) {
                if (!tmpNode.right) { return null }
                parent = tmpNode
                tmpNode = tmpNode.right
            }
            else {
                if (!tmpNode.left) { return null }
                parent = tmpNode
                tmpNode = tmpNode.left
            }
        }
        this._size--

        if (!tmpNode.right) {
            if (!parent) { this._root = tmpNode.left }
            else if (parent.key > tmpNode.key) { parent.left = tmpNode.left }
            else { parent.right = tmpNode.left }
        }
        else if (!tmpNode.right.left) {
            tmpNode.right.left = tmpNode.left
            if (!parent) { this._root = tmpNode.right }
            else if (parent.key > tmpNode.key) { parent.left = tmpNode.right }
            else { parent.right = tmpNode.right }
        }
        else {
            let leftest = tmpNode.right.left
            let leftestParent = tmpNode.right

            while (leftest.left != null) {
                leftestParent = leftest
                leftest = leftest.left
            }

            leftestParent.left = leftest.right
            this._root.left = tmpNode.left
            leftest.right = tmpNode.right

            if (!parent) { this._root = leftest }
            else if (parent.key > tmpNode.key) { parent.left = leftest }
            else { parent.right = leftest }
        }

        return tmpNode
    }
}
