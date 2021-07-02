import { Component, Vue } from 'vue-property-decorator'

@Component({
    props: {
        divStyle: Object,
        loading: Boolean,
        accept: String,
        disabled: Boolean,
        onChange: Function,
        importFile: Function,
        children: Node
    }
})
export default class FileInput extends Vue {
    id = 1
    selectFile = (): void => {
        ;(this.$refs.file as any).vaule = null
        ;(this.$refs.file as any).click()
    }
    render(): JSX.Element {
        const {
            divStyle,
            loading = false,
            accept,
            disabled = false,
            onChange,
            importFile
        } = this.$props
        return (
            <div style={divStyle} onClick={this.selectFile}>
                {this.$slots.default}
                <input
                    key={this.id}
                    ref="file"
                    type="file"
                    accept={accept}
                    disabled={disabled || loading}
                    style={{
                        width: 0,
                        height: 0,
                        visibility: 'hidden'
                    }}
                    onChange={(e: any) => {
                        if (onChange) {
                            onChange(e)
                        }
                        if (importFile) {
                            importFile(e.target.files)
                        }
                        // 更新input,防止选择同一个文件不能
                        this.id += 1
                    }}
                ></input>
            </div>
        )
    }
}
